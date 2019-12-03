import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { FormConnectionComponent } from './forms/form-connection/form-connection.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormInscriptionComponent } from './forms/form-inscription/form-inscription.component';
import {RouterModule, Routes} from "@angular/router";
import { ListPlaceComponent } from './views/lieu/list-place/list-place.component';
import { SinglePlaceComponent } from './views/lieu/single-place/single-place.component';
import { DetailPlaceComponent } from './views/lieu/detail-place/detail-place.component';
import { ListReviewComponent } from './views/comment/list-review/list-review.component';
import { DetailReviewComponent } from './views/comment/detail-review/detail-review.component';
import { FormPlaceComponent } from './forms/form-place/form-place.component';
import { SmartFormPlaceComponent } from './forms/smart-form-place/smart-form-place.component';
import { FormReviewComponent } from './forms/form-review/form-review.component';

// path = le nom du controller de l'api en fonction de ce que l'on veut faire
// component : celui que l'on souhaite afficher
// Les imports sont déja fait
const routes: Routes = [
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
    ListPlaceComponent,
    SinglePlaceComponent,
    DetailPlaceComponent,
    ListReviewComponent,
    DetailReviewComponent,
    FormPlaceComponent,
    SmartFormPlaceComponent,
    FormReviewComponent
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
