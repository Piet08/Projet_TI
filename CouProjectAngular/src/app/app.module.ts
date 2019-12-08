import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormConnectionComponent } from './forms/form-connection/dumb-form-connection/form-connection.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FormInscriptionComponent } from './forms/form-inscription/dumb-form-inscription/form-inscription.component';
import {RouterModule, Routes} from "@angular/router";
import {AgmCoreModule} from '@agm/core';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {SmartFormInscriptionComponent} from "./forms/form-inscription/smart-form-inscription/smart-form-inscription.component";
import {SmartFormConnectionComponent} from "./forms/form-connection/smart-form-connection/smart-form-connection.component";
import { ListPlaceComponent } from './views/lieu/list-place/list-place.component';
import { SinglePlaceComponent } from './views/lieu/single-place/single-place.component';
import { DetailPlaceComponent } from './views/lieu/detail-place/detail-place.component';
import { ListReviewComponent } from './views/comment/list-review/list-review.component';
import { SingleReviewComponent } from './views/comment/single-review/single-review.component';
import { FormPlaceComponent } from './forms/form-place/form-place.component';
import { SmartFormPlaceComponent } from './forms/smart-form-place/smart-form-place.component';
import { FormReviewComponent } from './forms/form-review/form-review.component';
import { SmartFormReviewComponent } from './forms/smart-form-review/smart-form-review.component';
import { DumpMapComponent } from './map/dump-map/dump-map.component';
import { SmartMapComponent } from './map/smart-map/smart-map.component';

import { HomeComponent } from './views/home/home.component';
import { TypePipe } from './views/lieu/filter-place/pipe/type.pipe';
import { FilterPlaceComponent } from './views/lieu/filter-place/filter-place.component';
import { RatingPipe } from './views/lieu/filter-place/pipe/rating.pipe';
import {JwtInterceptor} from './JwtInterceptor';
import {AuthGard} from './AuthGard';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import {AuthAdminGard} from './AuthAdminGard';
import { GestionPlaceComponent } from './admin/gestion-place/gestion-place.component';
import { SmartGestionPlaceComponent } from './admin/smart-gestion-place/smart-gestion-place.component';
import { SingleGestionPlaceComponent } from './admin/single-gestion-place/single-gestion-place.component';
import { SmartGestionReviewComponent } from './admin/smart-gestion-review/smart-gestion-review.component';
import { SingleGestionReviewComponent } from './admin/single-gestion-review/single-gestion-review.component';
import { DetailUserComponent } from './User/detail-user/detail-user.component';
import { SingleUserComponent } from './User/single-user/single-user.component';
import { ListUserComponent } from './User/list-user/list-user.component';
import { DetailReviewComponent } from './views/comment/detail-review/detail-review.component';


// path = le nom du controller de l'api en fonction de ce que l'on veut faire
// component : celui que l'on souhaite afficher
// Les imports sont déja fait
const routes: Routes = [
  {path: 'login', component:SmartFormConnectionComponent},
  {path: 'register', component:SmartFormInscriptionComponent},
  {path: 'places', component:ListPlaceComponent},
  {path: 'place/:id', component:DetailPlaceComponent},
  {path: 'forms/place', canActivate : [AuthGard],component:SmartFormPlaceComponent},
  {path: 'address', component:SmartMapComponent},
  {path: 'home', component:HomeComponent},
  {path: 'admin/places',canActivate : [AuthAdminGard],component:SmartGestionPlaceComponent},
  {path: 'admin/place/reviews/:id',canActivate : [AuthAdminGard],component:SmartGestionReviewComponent},
  {path: 'users',canActivate:[AuthGard],component:ListUserComponent},
  {path: 'user/:id',canActivate:[AuthGard],component:DetailUserComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    FormConnectionComponent,
    FormInscriptionComponent,
    SmartFormInscriptionComponent,
    SmartFormConnectionComponent,
    ListPlaceComponent,
    SinglePlaceComponent,
    DetailPlaceComponent,
    ListReviewComponent,
    SingleReviewComponent,
    FormPlaceComponent,
    SmartFormPlaceComponent,
    FormReviewComponent,
    SmartFormReviewComponent,
    HomeComponent,
    TypePipe,
    FilterPlaceComponent,
    RatingPipe,
    DumpMapComponent,
    SmartMapComponent,
    HomeComponent,
    AdminHomeComponent,
    GestionPlaceComponent,
    SmartGestionPlaceComponent,
    SingleGestionPlaceComponent,
    SmartGestionReviewComponent,
    SingleGestionReviewComponent,
    DetailUserComponent,
    SingleUserComponent,
    ListUserComponent,
    DetailReviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyD6dHdCHR8CbbpkMiCkYAcJxzXgvV1E64k'}),
    AgmJsMarkerClustererModule
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
