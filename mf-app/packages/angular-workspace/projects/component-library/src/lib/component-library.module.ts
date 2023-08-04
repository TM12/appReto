import { APP_INITIALIZER,NgModule } from '@angular/core';
import { ComponentLibraryComponent } from './component-library.component';
import { FormularioComponent } from './formulario/formulario.component';
import { ListaComponent } from './lista/lista.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PrincipalComponent } from './principal/principal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe, HashLocationStrategy, LocationStrategy, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, SortDirection } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule} from '@angular/material/snack-bar';
import { ToastrModule } from 'ngx-toastr';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogInfoComponent } from './dialog-info/dialog-info.component';


@NgModule({
  declarations: [
    ComponentLibraryComponent,
    FormularioComponent,
    ListaComponent,
    PrincipalComponent,
    DialogInfoComponent
  ],
  imports: [
    ReactiveFormsModule,
    NgIf,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    ToastrModule.forRoot(),
    DatePipe,
    HttpClientModule
  ],
  exports: [
    ComponentLibraryComponent
  ]
})
export class ComponentLibraryModule { }
