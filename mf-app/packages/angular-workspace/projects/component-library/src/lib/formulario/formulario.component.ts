import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Regex } from '../constants/regex.contants';
import { UsuarioType } from '../types/usuario.type';
import { ToastrService } from 'ngx-toastr';
import { ComponentLibraryService } from '../component-library.service';

@Component({
  selector: 'formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.sass']
})
export class FormularioComponent implements OnInit {
  
  txtBoton="";
  @Input() tipoBtn:any;
  @Input() usuario:UsuarioType;
  @Output() showForm = new EventEmitter<boolean>();
  public form1:FormGroup;

  constructor(private fb: FormBuilder,
              private _service: ComponentLibraryService,
              private _toastr: ToastrService) { 
      
      this.form1 = this.createForm();
  }

  ngOnInit(): void {
    this.txtBoton= this.tipoBtn;
    let usuario = this.usuario;
    if(usuario){
      this.form1.get("id")?.setValue(this.usuario.id);
      this.form1.get("nombres")?.setValue(this.usuario.nombres);
      this.form1.get("apaterno")?.setValue(this.usuario.apaterno);
      this.form1.get("amaterno")?.setValue(this.usuario.amaterno);
      this.form1.get("celectronico")?.setValue(this.usuario.celectronico);
      this.form1.get("ncelular")?.setValue(this.usuario.ncelular);
      this.form1.get("nusuario")?.setValue(this.usuario.nusuario);
      this.form1.get("contrasena")?.setValue(this.usuario.contrasena);
    }
  }

  createForm(){
    return this.fb.group({
      id: [null],
      nombres: [null, [Validators.required,Validators.pattern(Regex.soloLetras)]],
      apaterno:[null,[Validators.required,Validators.pattern(Regex.soloLetras)]],
      amaterno:[null,[Validators.required,Validators.pattern(Regex.soloLetras)]],
      celectronico:[null,[Validators.required]],
      ncelular: [null,[Validators.required,Validators.minLength(9),Validators.pattern(Regex.soloNumeros)]],
      nusuario: [null, [Validators.required]],
      contrasena: [null, [Validators.required]]
    });
  }

  guardar(){
    let usuario:UsuarioType = {
      id:this.form1.get("id")?.value,
      nombres:this.form1.get("nombres")?.value,
      apaterno:this.form1.get("apaterno")?.value,
      amaterno:this.form1.get("amaterno")?.value,
      nusuario:this.form1.get("nusuario")?.value,
      contrasena:this.form1.get("contrasena")?.value,
      celectronico:this.form1.get("celectronico")?.value,
      ncelular:this.form1.get("ncelular")?.value,
    }
    this._service.sendUser('usuario',usuario).subscribe(
      (resp:any)=>{
        this._toastr.success('Guardado exitosamente', 'Éxito');
        this.ocultarFormulario();
      },
      (err:any)=>{
        this._toastr.error('Ocurrió un error al guardar', 'Error');
        console.log("ocurrio un error al guardar ", err);
      }
    );
  }

  ocultarFormulario(){
    this.showForm.emit(false);
    this.form1.reset();
  }

}
