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
import { ListPlaceComponent } from './views/lieu/list-place/list-place.component';
import { SinglePlaceComponent } from './views/lieu/single-place/single-place.component';
import { DetailPlaceComponent } from './views/lieu/detail-place/detail-place.component';
import { ListReviewComponent } from './views/comment/list-review/list-review.component';
import { DetailReviewComponent } from './views/comment/detail-review/detail-review.component';
import { FormPlaceComponent } from './forms/form-place/form-place.component';
import { SmartFormPlaceComponent } from './forms/smart-form-place/smart-form-place.component';

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
  {path: 'authenticate', component:FormConnectionComponent},
  {path: 'User', component:FormInscriptionComponent},
  {path: 'lieux', component:ListPlaceComponent},
  {path: 'lieux/:id', component:DetailPlaceComponent},
  {path: 'forms/lieux', component:SmartFormPlaceComponent},
  {path: '',component:ListPlaceComponent}
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
    ListPlaceComponent,
    SinglePlaceComponent,
    DetailPlaceComponent,
    ListReviewComponent,
    DetailReviewComponent,
    FormPlaceComponent,
    SmartFormPlaceComponent
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
