import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormConnectionComponent } from './forms/form-connection/dumb-form-connection/form-connection.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormInscriptionComponent } from './forms/form-inscription/dumb-form-inscription/form-inscription.component';
import {RouterModule, Routes} from "@angular/router";
import { ListLieuComponent } from './views/lieu/list-lieu/list-lieu.component';
import { SingleLieuComponent } from './views/lieu/single-lieu/single-lieu.component';
import { DetailLieuComponent } from './views/lieu/detail-lieu/detail-lieu.component';
import { ListCommentComponent } from './views/comment/list-comment/list-comment.component';
import { DetailCommentComponent } from './views/comment/detail-comment/detail-comment.component';
import { FormLieuComponent } from './forms/form-lieu/form-lieu.component';
import {SmartFormInscriptionComponent} from "./forms/form-inscription/smart-form-inscription/smart-form-inscription.component";
import {SmartFormConnectionComponent} from "./forms/form-connection/smart-form-connection/smart-form-connection.component";

// path = le nom du controller de l'api en fonction de ce que l'on veut faire
// component : celui que l'on souhaite afficher
// Les imports sont déja fait
const routes: Routes = [
  {path: 'authenticate', component:SmartFormConnectionComponent},
  {path: 'Utilisateur', component:SmartFormInscriptionComponent},
  {path: 'lieux', component:ListLieuComponent},
  {path: 'lieux/:id', component:DetailLieuComponent},
  {path: 'forms/lieux', component:FormLieuComponent},
  {path: '',component:ListLieuComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FormConnectionComponent,
    FormInscriptionComponent,
    ListLieuComponent,
    SingleLieuComponent,
    DetailLieuComponent,
    ListCommentComponent,
    DetailCommentComponent,
    FormLieuComponent,
    SmartFormInscriptionComponent,
    SmartFormConnectionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
