import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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

  idAddress!: string;
  data!: UserAddress;

  form!: FormGroup;

  private userSvc$!: any;
  private accessSvc$!: any;

  constructor( 
    private router: Router,
    private params: ActivatedRoute,
    private formBuilder: FormBuilder,
    private cookiesSvc: AppCookiesService,
    private accessSvc: AccessService,
    private userSvc: UserService
  ) { }

  ngOnInit(): void {
    this.params.queryParams.subscribe(
      param => {
        this.idAddress = param['id'];
        if ( this.idAddress !== undefined ) 
          this.userSvc$ = this.userSvc.getAddress( this.cookiesSvc.getToken(), this.idAddress )
            .subscribe( data => {
              this.data = data;
              this.createForm();
            });
          else
            this.createForm();
      }
    );
  }

  ngOnDestroy(): void {
    this.userSvc$?.unsubscribe();
    this.accessSvc$?.unsubscribe();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.checkForm( this.form );
    if ( !this.form.valid ) return;
    if( this.data ) this.updateAddress( this.form.value );
    else this.addAddress( this.form.value );
  }

  async refreshToken () {
    await this.accessSvc.refreshToken( this.cookiesSvc.getToken(true) )
          .toPromise().then( res => {
            this.cookiesSvc.login( res.token, res.refresh );
          });
  }

  async addAddress( address: UserAddress ): Promise<void> {
    if ( !this.cookiesSvc.checkLogin() ) return;
    if ( this.cookiesSvc.getToken() == '' ) await this.refreshToken();
    this.userSvc$ = this.userSvc.addAddress( this.cookiesSvc.getToken(), address)
      .subscribe(
        res => {
          this.router.navigate( ['/addresses'] );
        }
      );
  }
  async updateAddress( address: UserAddress ): Promise<void> {
    if ( !this.cookiesSvc.checkLogin() ) return;
    if ( this.cookiesSvc.getToken() == '' ) await this.refreshToken();
    this.userSvc$ = this.userSvc.updateAddress( this.cookiesSvc.getToken(), address, this.data._id)
      .subscribe(
        res => {
          this.router.navigate( ['/addresses'] );
        }
      );
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
      'has-error': this.isFieldTouched(field) && !this.isFieldValid(field) || false,
      'has-success': this.isFieldTouched(field) && this.isFieldValid(field) || false
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
        country: [ this.data !== undefined ? this.data.country : 'España', [Validators.required]],
        name: [ this.data !== undefined ? this.data.name : '', [Validators.required, Validators.minLength(10)] ],
        phone: [ this.data !== undefined ? this.data.phone : '', [Validators.required] ],
        address: [ this.data !== undefined ? this.data.address : '', [Validators.required, Validators.minLength(5)] ],
        apartment: [ this.data !== undefined && this.data.apartment !== 'undefined'  ? this.data.apartment : '' ],
        zipCode: [ this.data !== undefined ? this.data.zipCode : '' , [Validators.required]],
        city: [ this.data !== undefined ? this.data.city : '', [Validators.required]],
        province: [ this.data !== undefined ? this.data.province : '', [Validators.required]],
        nif: [ this.data !== undefined ? this.data.nif : '', [Validators.required, this.validateDNI] ],
        defaultAddress: [ this.data !== undefined ? this.data.defaultAddress : false ] 
      }
    );
  }

  cancel(event: Event): void {
    event.preventDefault();
    this.router.navigate( ['/addresses'] );
  }

}
