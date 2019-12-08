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
import {AgmCoreModule} from '@agm/core';
import {AgmJsMarkerClustererModule} from '@agm/js-marker-clusterer';
import {SmartFormInscriptionComponent} from "./forms/form-inscription/smart-form-inscription/smart-form-inscription.component";
import {SmartFormConnectionComponent} from "./forms/form-connection/smart-form-connection/smart-form-connection.component";
import { ListPlaceComponent } from './views/lieu/list-place/list-place.component';
import { SinglePlaceComponent } from './views/lieu/single-place/single-place.component';
import { DetailPlaceComponent } from './views/lieu/detail-place/detail-place.component';
import { ListReviewComponent } from './views/comment/list-review/list-review.component';
import { DetailReviewComponent } from './views/comment/detail-review/detail-review.component';
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
import { FilterMarkersComponent } from './map/filter-markers/filter-markers.component';
import { RatingMapPipe } from './map/filter-markers/pipe/rating-map.pipe';
import { TypeMapPipe } from './map/filter-markers/pipe/type-map.pipe';
import { RangeMapPipe } from './map/filter-markers/pipe/range-map.pipe';


// path = le nom du controller de l'api en fonction de ce que l'on veut faire
// component : celui que l'on souhaite afficher
// Les imports sont déja fait
const routes: Routes = [
  {path: 'User/authenticate', component:SmartFormConnectionComponent},
  {path: 'User', component:SmartFormInscriptionComponent},
  {path: 'lieux', component:ListPlaceComponent},
  {path: 'lieux/:id', component:DetailPlaceComponent},
  {path: 'forms/place', component:SmartFormPlaceComponent},
  {path: 'Address', component:SmartMapComponent},
  {path: 'home', component:HomeComponent}

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
    DetailReviewComponent,
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
    FilterMarkersComponent,
    RatingMapPipe,
    TypeMapPipe,
    RangeMapPipe
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
