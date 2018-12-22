import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BsModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular/main';



@NgModule({
    declarations: [
        UserComponent
    ],
    imports: [
        MatSelectModule,
        MatListModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild([
            { path: 'user', component: UserComponent }
        ]),
        BsModalComponent,
        BrowserAnimationsModule
    ],
    providers: [
        UserService
    ]
})

export class UserModule {

}