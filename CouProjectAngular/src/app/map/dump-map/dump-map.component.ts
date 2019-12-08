import {Component, Input, OnInit} from '@angular/core';
import {Place} from '../../views/lieu/place';
import {Router} from '@angular/router';
import {Address} from '../../Address/address';
import {PlaceAndAddressDto} from '../../views/lieu/place-dto';
import {EnumTypeLieu} from '../../EnumTypeLieu';
import {EnumRange} from '../../EnumRange';
import {Location} from '../location-model';

@Component({
  selector: 'app-dump-map',
  templateUrl: './dump-map.component.html',
  styleUrls: ['./dump-map.component.css']
})
export class DumpMapComponent implements OnInit {

  private _markers: marker[] = [];
  private _places: Place[] = [];
  private _placeChosenToInspect: PlaceAndAddressDto;
  private _userLocation: Location;
  categoryFilter: EnumTypeLieu = EnumTypeLieu.ALL;
  rangeFilter: EnumRange = EnumRange.ALL;
  style: any = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#242f3e"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#263c3f"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6b9a76"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#38414e"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#212a37"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9ca5b3"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#746855"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#1f2835"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#f3d19c"
        }
      ]
    },
    {
      "featureType": "transit",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#2f3948"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#d59563"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#515c6d"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#17263c"
        }
      ]
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigateToDetailLieu(id:number) {
    this.router.navigate(['place/'+id]);
  }

  seePlaceChosenToDisplay(m: marker) {
    let tmpPlaceAndAddress:PlaceAndAddressDto={place:new Place(m.idPlace,m.name,m.type,m.description,m.idAdr).toLieuDto(),address:new Address(m.idAdr,m.city,m.straat,m.num,m.postalCode).toAdresseDto(),avgRate:m.rating};
    this.placeChosenToInspect = tmpPlaceAndAddress;
  }


  get markers(): marker[] {
    return this._markers;
  }

  @Input()
  set markers(value: marker[]) {
    this._markers = value;
  }


  get places(): Place[] {
    return this._places;
  }

  @Input()
  set places(value: Place[]) {
    this._places = value;
  }


  get placeChosenToInspect(): PlaceAndAddressDto {
    return this._placeChosenToInspect;
  }

  @Input()
  set placeChosenToInspect(value: PlaceAndAddressDto) {
    this._placeChosenToInspect = value;
  }

  navigateToFormAddLieu() {
    this.router.navigate(['forms/place']);
  }


  get userLocation(): Location {
    return this._userLocation;
  }

  @Input()
  set userLocation(value: Location) {
    this._userLocation = value;
  }
}
