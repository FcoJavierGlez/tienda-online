import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAddress } from 'src/app/shared/interfaces/user-address';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {

  @Input() data!: UserAddress;

  form!: FormGroup;

  private userSvc$!: any;
  private accessSvc$!: any;

  constructor( 
    private router: Router,
    private formBuilder: FormBuilder,
    private cookiesSvc: AppCookiesService,
    private accessSvc: AccessService,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(): void { }

  ngOnDestroy(): void {
    this.userSvc$?.unsubscribe();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.checkForm( this.form );
    // console.log(this.form.value);
    if ( !this.form.valid ) return;
    if( this.data ) this.updateAddress( this.form.value );
    else this.addAddress( this.form.value );
    // this.resetForm();
  }

  addAddress( address: UserAddress ): void {
    if ( !this.cookiesSvc.checkLogin() ) return;
    if ( this.cookiesSvc.getToken() == '' ) 
      this.accessSvc$ = this.accessSvc.refreshToken( this.cookiesSvc.getToken(true) )
        .subscribe(
          res => {
            this.cookiesSvc.login( res.token, res.refresh );
            this.userSvc$ = this.userSvc.addAddress( this.cookiesSvc.getToken(), address)
            .subscribe(
              res => {
                this.router.navigate( ['/addresses'] );
              }
            );
          }
        );
    else
      this.userSvc$ = this.userSvc.addAddress( this.cookiesSvc.getToken(), address)
        .subscribe(
          res => {
            this.router.navigate( ['/addresses'] );
          }
        );
  }
  updateAddress( address: UserAddress ): void {
    /* if ( !this.cookiesSvc.checkLogin() ) return;
    this.userSvc$ = this.userSvc.updateAddress( this.cookiesSvc.getToken(), address, this.data._id )
                              .subscribe(
                                res => {
                                  this.router.navigate( ['/addresses'] );
                                }
                              ); */
  }

  private translateFieldName(fieldName: string) : string {
    switch (fieldName) {
      case 'name': return 'nombre';
      case 'address': return 'dirección';
      case (fieldName.match(/(zip|code)/i))?.input: return 'código postal';
      case 'city': return 'ciudad';
      case 'province': return 'provincia';
      case 'country': return 'país';
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
      nif: `El ${this.translateFieldName(fieldName)} no es válido`
    }
    return ERROR_MESSAGE[errorName]
  }

  private isFieldValid(field: string): boolean | undefined {
    return this.form.get(field)?.valid;
  }
  private isFieldTouched(field: string): boolean | undefined {
    return this.form.get(field)?.touched;
  }

  displayFieldCss(field: string): any {
    return {
      'has-error': this.isFieldTouched(field) && !this.isFieldValid(field),
      'has-success': this.isFieldTouched(field) && this.isFieldValid(field)
    };
  }

  private checkForm(form: FormGroup): void {
    const controls = Object.keys(form.controls);

    controls.forEach( field => {
      const element = form.get(field);
      if ( element instanceof FormControl ) element.markAsTouched( { onlySelf: true } );
      else if ( element instanceof FormGroup ) this.checkForm( element );
    });
  }

  private validateDNI( control: AbstractControl ): { [key: string]: boolean } | null {
    const LETTERS = "TRWAGMYFPDXBNJZSQVHLCKE";

    if (control.value == '') return null;

    try {
      let {numbers,letter} = control.value.match(/^(?<numbers>\d{8})(-|\s)?(?<letter>[A-Z])$/i)?.groups;
      return letter.toUpperCase() == LETTERS[ numbers % 23 ] ? null : { 'dni': true };
    } catch (error) {
      return { 'dni': true };
    }
    
  }

  resetForm(): void {
    this.form.reset();
  }

  private createForm(): void {
    this.form = this.formBuilder.group(
      {
        country: ['España', [Validators.required]],
        name: [ '', [Validators.required, Validators.minLength(10)] ],
        phone: [ '', [Validators.required] ],
        address: [ '', [Validators.required, Validators.minLength(5)] ],
        apartment: [ '' ],
        zipCode: [ '' , [Validators.required]],
        city: [ '', [Validators.required]],
        province: [ '', [Validators.required]],
        nif: [ '', [Validators.required, this.validateDNI] ],
        defaultAddress: [ false ] 
      }
    );
  }

  cancel(event: Event): void {
    event.preventDefault();
    this.router.navigate( ['/addresses'] );
  }

}
