import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { UserCreditCards } from 'src/app/shared/interfaces/user-credit-cards';
import { AccessService } from 'src/app/shared/services/access.service';
import { AppCookiesService } from 'src/app/shared/services/app-cookies.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.css']
})
export class CreditCardsComponent implements OnInit {

  @Input() creditCards!: any;

  showAddCard: boolean = false;
  form!: FormGroup;

  private userDeleteCreditCardSvc$!: any;

  constructor(
    private formBuilder: FormBuilder,
    private cookiesSvc: AppCookiesService,
    private accessSvc: AccessService,
    private userSvc: UserService,
    private dialog: MatDialog
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.userDeleteCreditCardSvc$?.unsubscribe
  }

  edit(event: Event, card: UserCreditCards): void {
    event.preventDefault();
    console.log( card );
  }

  async delete(event: Event, card: UserCreditCards): Promise<void> {
    event.preventDefault();
    if ( !this.cookiesSvc.checkLogin() ) return;
    if ( this.cookiesSvc.getToken() == '' ) await this.refreshToken();

    let deleteCreditCard = this.dialog.open(DialogComponent, {
      data: {
        title: 'Login fallido',
        message: 'Está a punto de borrar esta tarjeta de crédito/débito.',
        alertMessage: true,
        continueMessage: true,
        optionButtons: true
      }
    });
    deleteCreditCard.afterClosed().subscribe(
      res => {
        if (res) {
          this.userDeleteCreditCardSvc$ = this.userSvc.deleteCreditCard( this.cookiesSvc.getToken(), card );
        }
      }
    );
  }

  getInfoCard(card: UserCreditCards): any {
    const cardNumber = `${card.cardNumber}`;
    switch (cardNumber) {
      case (cardNumber.match(/^(5[1-5]|222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[0-1]\d|2720)/))?.input: 
        return ( { type: 'MasterCard / 4B / Euro6000', class: 'credit-logo-expansion-panel mastercard' } );
      case (cardNumber.match(/^(4)/))?.input: return ( { type: 'Visa / Visa Electron', class: 'credit-logo-expansion-panel visa' } );
      case (cardNumber.match(/^(34|37)/))?.input: return ( { type: 'American Express', class: 'credit-logo-expansion-panel american-express' } );
      default: return ( { type: 'MasterCard / 4B / Euro6000', class: 'credit-logo-expansion-panel mastercard' } );
    }
  }

  cardExpired(card: UserCreditCards): boolean {
    const currentDate = new Date();
    return card.year < currentDate.getFullYear() || card.year == currentDate.getFullYear() && card.month < currentDate.getMonth() + 1;
  }

  cssCardExpired(card: UserCreditCards): any {
    return {
      'expired': this.cardExpired(card)
    }
  }

  monthList(): number[] {
    const dayList = [];
    for (let i = 1; i < 13; i++) dayList.push( i );
    return dayList;
  }
  yearList(): number[] {
    const year = ( new Date() ).getFullYear();
    const yearList = [];
    for (let i = year; i < year + 11; i++) yearList.push( i );
    return yearList;
  }

  toggleShowAddCredit(event: Event): void {
    event.preventDefault();
    this.resetForm();
    this.showAddCard = !this.showAddCard;
  }

  cssAddCard() : any {
    return {
      'd-none': !this.showAddCard
    }
  }

  async refreshToken () {
    await this.accessSvc.refreshToken( this.cookiesSvc.getToken(true) )
          .toPromise().then( res => {
            this.cookiesSvc.login( res.token, res.refresh );
          });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.checkForm( this.form );
    if ( !this.form.valid ) return;
    this.form.value.month = typeof this.form.value.month == 'string' ? parseInt(this.form.value.month) : this.form.value.month;
    this.form.value.year = typeof this.form.value.year == 'string' ? parseInt(this.form.value.year) : this.form.value.year;
    
    // console.log(this.form.value);
    if (this.cookiesSvc.getToken() == '' ) await this.refreshToken();
    this.userSvc.addCreditCard( this.cookiesSvc.getToken(), this.form.value );
    this.toggleShowAddCredit(event);
    
  }

  private translateFieldName(fieldName: string) : string {
    switch (fieldName) {
      case 'name': return 'nombre';
      case 'cardNumber': return 'número de tarjeta';
      case 'month': return 'mes';
      case 'year': return 'año';
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
      creditCard: `El ${this.translateFieldName(fieldName)} no es válido`
    }
    return ERROR_MESSAGE[errorName]
  }

  private checkForm(form: FormGroup): void {
    const controls = Object.keys(form.controls);

    controls.forEach( field => {
      const element = form.get(field);
      if ( element instanceof FormControl ) element.markAsTouched( { onlySelf: true } );
      else if ( element instanceof FormGroup ) this.checkForm( element );
    });
  }

  private resetForm(): void {
    const MONTH_OPTION_DEFAULT = document.getElementById("monthDefault");
    const YEAR_OPTION_DEFAULT  = document.getElementById("yearDefault");
    this.form.reset(
      {
        cardNumber: null,
        name: '',
        month: 1,
        year: ( new Date() ).getFullYear()
      }
    );
    MONTH_OPTION_DEFAULT?.removeAttribute("selected");
    MONTH_OPTION_DEFAULT?.setAttribute("selected", "true");
    YEAR_OPTION_DEFAULT?.removeAttribute("selected");
    YEAR_OPTION_DEFAULT?.setAttribute("selected", "true");
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

  private validateCreditNumber( creditNumber: AbstractControl ): { [key: string]: boolean } | null {
    const REGEXP = /^[1-6]\d{11,18}$/;
    
    if (creditNumber.value == 0) return { creditCard: true };
    else if (creditNumber.value == null) return null;
    return REGEXP.test( `${creditNumber.value}` ) ? null : { creditCard: true };
  }

  private createForm(): void {
    this.form = this.formBuilder.group(
      {
        cardNumber: [ null, [ Validators.required, this.validateCreditNumber ] ],
        name: [ '', [ Validators.required, Validators.minLength(3) ] ],
        month: [ 1, [ Validators.required] ],
        year: [ ( new Date() ).getFullYear() , [ Validators.required ] ]
      }
    );
  }

}
