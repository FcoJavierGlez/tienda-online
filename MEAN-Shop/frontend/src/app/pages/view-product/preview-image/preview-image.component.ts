import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.css']
})
export class PreviewImageComponent implements OnInit {

  @Input() srcImage!: string;
  @Input() activated!: boolean;
  @Input() index!: number;

  @Output() changePhoto = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { 
    this.activated = this.index == 0;
  }

  active(): void {
    this.activated = true;
    this.changePhoto.emit( this.srcImage );
  }

  style(): string {
    return `background-image: url(${this.srcImage})`;
  }

  cssPreview(): any {
    return {
      'activated': this.activated
    }
  }

}
