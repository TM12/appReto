import { Component, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.sass']
})
export class PrincipalComponent implements OnInit {

  show=false;
  showForm = new EventEmitter<boolean>();
  usr:any;

  tipoBtn="Registrar"
  constructor() { 
  }
  
  ngOnInit(): void {
    
  }

  mostrarFormulario(obj:any){
    this.usr = obj.user;
    this.tipoBtn=(obj.user)?"Guardar":"Registrar";
    this.show=obj.showform;
  }

}
