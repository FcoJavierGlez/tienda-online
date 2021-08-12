import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-credit-cards',
  templateUrl: './credit-cards.component.html',
  styleUrls: ['./credit-cards.component.css']
})
export class CreditCardsComponent implements OnInit {

  @Input() creditCards!: any;

  showAddCard: boolean = false;
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { 
    this.createForm();
  }

  ngOnInit(): void {
  }

  private formatNumber = (number: number): string => number < 10 ? `0${number}` : `${number}`;

  monthList(): string[] {
    const dayList = [];
    for (let i = 1; i < 13; i++) dayList.push( this.formatNumber(i) );
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

  onSubmit(event: Event): void {

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
        number: '',
        name: '',
        month: '01',
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

  private createForm(): void {
    this.form = this.formBuilder.group(
      {
        number: [ '', [Validators.required]],
        name: [ '', [Validators.required, Validators.minLength(3)] ],
        month: [ '01', [Validators.required] ],
        year: [ ( new Date() ).getFullYear() , [Validators.required] ]
      }
    );
  }

}
