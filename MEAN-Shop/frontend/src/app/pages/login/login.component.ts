import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;

  private readonly REGEXP_EMAIL = /^[^\_\W\d]\w+@[a-z]+\.[a-z]{2,3}$/;

  constructor( 
    private formBuilder: FormBuilder, 
    private accessSvc: AccessService,
    private appCookies: AppCookiesService,
    private router: Router,
    private dialog: MatDialog,
    private cartSvc: CartService
  ) { }

  ngOnInit(): void {
    if ( !this.appCookies.checkLogin() ) this.cartSvc.resetCart();
    this.createForm();
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
    this.accessSvc.login( this.form.value )?.subscribe(
      data => {
        this.appCookies.login( data.token, data.refresh );
        this.cartSvc.requestGetCart( this.appCookies.getToken() );
        this.router.navigate(['/']);
      },
      err => {
        let loginDialog = this.dialog.open(DialogComponent, {
          data: {
            title: 'Login fallido',
            message: `${err.error.message}.`,
            alertMessage: true,
            optionButtons: false
          }
        });
        loginDialog.afterClosed().subscribe();
      }
    );
  }

  toggleInputPassword(event: Event): void {
    event.preventDefault();
    const elementHTML = ( <HTMLElement> event.target );
    const type = elementHTML.parentElement?.parentElement?.children[1].getAttribute("type");
    elementHTML.parentElement?.parentElement?.children[1].setAttribute("type", type == 'password' ? 'text' : 'password');
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

  private createForm():void {
    this.form = this.formBuilder.group(
      {
        email: [ '', [Validators.required, Validators.pattern( this.REGEXP_EMAIL )] ],
        password: [ '', [Validators.required] ]
      }
    );
  }

}
