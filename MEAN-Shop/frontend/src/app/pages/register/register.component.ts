import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AccessService } from 'src/app/shared/services/access.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;
  tokenActivate!: string;
  messageActivate: string = 'Activando cuenta...';

  private readonly REGEXP_EMAIL = /^[^\_\W\d]\w+@[a-z]+\.[a-z]{2,3}$/;

  constructor( 
    private formBuilder: FormBuilder, 
    private router: Router,
    private params: ActivatedRoute,
    private accessSvc: AccessService,
    private dialog: MatDialog
  ) { 
    
  }

  ngOnInit(): void {
    this.params.queryParams.subscribe(
      res => this.tokenActivate = res['activate']
    );
    console.log(this.tokenActivate);
    if (this.tokenActivate) 
      this.accessSvc.activate( this.tokenActivate ).subscribe(
        res => {
          this.messageActivate = res.message;
        }
      )
    else this.createForm();
  }

  private translateFieldName(fieldName: string) : string {
    switch (fieldName) {
      case 'name': return 'nombre';
      case 'email': return 'correo';
      case 'street': return 'calle';
      case (fieldName.match(/(zip|code)/i))?.input: return 'código postal';
      case 'city': return 'ciudad';
      case 'province': return 'provincia';
      case 'country': return 'país';
      case 'conditions': return 'condiciones';
      case 'password': return 'contraseña';
      case (fieldName.match(/(repeatPassword|repeat(\-|\_)password)/i))?.input: return 'repetir contraseña';
      default: return fieldName;
    }
  }

  getErrorMessage(field: string = ''): string {
    const error = this.form.get(field)?.errors;
    const fieldName = field.match(/(\w+)$/)?.[1] ||'';

    if (!error) return '';

    const errorName = Object.keys(error)[0];
    const ERROR_MESSAGE: any = {
      required: `El campo ${this.translateFieldName(fieldName)} es requerido`,
      email: `El correo no es válido`,
      minlength: `El campo ${this.translateFieldName(fieldName)} debe tener mínimo ${error?.minlength?.requiredLength} caracteres`,
      maxlength: `El campo ${this.translateFieldName(fieldName)} debe tener máximo ${error?.maxlength?.requiredLength} caracteres`,
      min: `El campo ${this.translateFieldName(fieldName)} debe valer como mínimo ${error?.min?.min}`,
      max: `El campo ${this.translateFieldName(fieldName)} debe valer como máximo ${error?.max?.max}`,
      pattern: `El campo ${this.translateFieldName(fieldName)} es incorrecto`,
      dni: `El ${this.translateFieldName(fieldName)} no es válido`,
      repeatPassword: `Las contraseñas deben coincidir`
    }
    return ERROR_MESSAGE[errorName]
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.checkForm( this.form );
    if (!this.form.valid) return;
    this.accessSvc.register( this.form.value ).subscribe(
      res => {
        console.log('Registrado con éxito');
        let registerDialog = this.dialog.open(DialogComponent, {
          data: {
            title: 'Registro',
            message: `${res.message}.`,
            alertMessage: false,
            continueMessage: false,
            optionButtons: false
          }
        });
        registerDialog.afterClosed().subscribe( () => this.router.navigate( ['/'] ) );
      },
      err => {
        let registerDialog = this.dialog.open(DialogComponent, {
          data: {
            title: 'Registro',
            message: `${err.error.message}.`,
            alertMessage: true,
            optionButtons: false
          }
        });
        registerDialog.afterClosed().subscribe();
      }
    );
  }

  toggleInputPassword(event: Event): void {
    event.preventDefault();
    const elementHTML = ( <HTMLElement> event.target );
    const type = elementHTML.parentElement?.parentElement?.children[1].getAttribute("type");
    elementHTML.parentElement?.parentElement?.children[1].setAttribute("type", type == 'password' ? 'text' : 'password');
  }

  private repeatPassword( control: AbstractControl ): { [key: string]: boolean } | null {
    if ( control.value == '' ) return null;
    const password = ( <HTMLInputElement> document.getElementById("password") ).value;
    if ( password == control.value ) return null;
    return { 'repeatPassword': true }
  }

  private checkForm(form: FormGroup): void {
    const controls = Object.keys(form.controls);
    controls.forEach( field => {
      const elementForm = form.get(field);
      if ( elementForm instanceof FormControl ) elementForm.markAsTouched( { onlySelf: true } );
      else if ( elementForm instanceof FormGroup ) this.checkForm( elementForm );
    });
  }
  
  divFormGroupCss(field: string): any {
    return {
      'has-error': this.form.get(field)?.touched && this.form.get(field)?.invalid,
      'has-success': this.form.get(field)?.touched && this.form.get(field)?.valid
    }
  }

  goLogin(): void {
    this.router.navigate( ['/login'] );
  }

  private createForm():void {
    this.form = this.formBuilder.group(
      {
        name: [ '', [Validators.required] ],
        email: [ '', [Validators.required, Validators.pattern( this.REGEXP_EMAIL )] ],
        password: [ '', [Validators.required, Validators.minLength(8)] ],
        repeatPassword: [ '', [Validators.required, this.repeatPassword] ],
      }
    );
    this.form.controls.password.valueChanges.subscribe(
      () => this.form.controls.repeatPassword.updateValueAndValidity()
    );
  }

}
