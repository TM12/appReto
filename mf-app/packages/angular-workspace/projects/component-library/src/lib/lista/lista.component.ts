import { AfterViewInit, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UsuarioType } from '../types/usuario.type';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ComponentLibraryService } from '../component-library.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { DialogInfoComponent } from '../dialog-info/dialog-info.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.sass']
})
export class ListaComponent implements AfterViewInit {
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  data: UsuarioType[] = [];
  displayedColumns: string[] = ['number', 'nusuario', 'correo', 'fmodificacion','accion'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() showForm = new EventEmitter<any>();

  constructor(private _service: ComponentLibraryService,
              private _dialog: MatDialog,
              private _toastr: ToastrService) { }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    
    this.getUsers();
  }

  getUsers(){
    this._service.getListUser('usuario').subscribe(
      (resp:any)=>{
        this.data = resp.message;
      },
      (err:any)=>{
        console.log("error ",err);
      }
    );
  }

  mostrarFormulario(type:any,user:any){
    let obj:any={}
    if(type==1){
      obj.showform = true;
      obj.user = undefined;
    }else{
      obj.showform = true;
      obj.user = user;
    }
    this.showForm.emit(obj);
  }

  mostrarDialog(user:UsuarioType){
    const dialogRef = this._dialog.open(DialogInfoComponent);

    dialogRef.componentInstance.mensaje=`¿Está seguro de eliminar al usuario ${user.nusuario}?`;
    dialogRef.componentInstance.txtok="Sí";
    dialogRef.componentInstance.txtclose="No";


    dialogRef.componentInstance.respuesta.subscribe((resp)=>{
      console.log("resp --> ",resp);
      if(resp){
        this._service.deleteUser('usuario',user).subscribe(
          (rp)=>{
            this._toastr.success('Usuario eliminado exitosamente', 'Éxito');
          },
          (error)=>{
            this._toastr.error('Ocurrió un error al eliminar usuario', 'Error');
          }
        )
      }

    });
  }
}