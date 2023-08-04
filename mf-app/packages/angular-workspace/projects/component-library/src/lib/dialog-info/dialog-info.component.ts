import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-dialog-info',
  templateUrl: './dialog-info.component.html',
  styleUrls: ['./dialog-info.component.sass']
})
export class DialogInfoComponent implements OnInit {
  @Input() mensaje:string;
  @Input() txtok:string;
  @Input() txtclose:string;
  @Output() respuesta = new EventEmitter<any>();
  constructor(public dialogRef: MatDialogRef<DialogInfoComponent>) { }

  ngOnInit(): void {
  }

  aceptar(){
    this.respuesta.emit(true);
  }

  close(){
    this.respuesta.emit(false);
  }

}
