import {Component, Input, OnInit} from '@angular/core';
import {Avis, AvisList} from '../Avis';
import {Subscription} from 'rxjs';
import {AvisService} from '../avis.service';
import {Lieu} from '../../lieu/Lieu';
import {ActivatedRoute} from '@angular/router';
import {LieuService} from '../../lieu/lieu.service';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {
  private _lieu:Lieu = new Lieu();
  private _listAvis:AvisList = [];
  private _id:number = -1;
  private subscriptions:Subscription[] = [];
  constructor(public avisService:AvisService,private route:ActivatedRoute, public lieuService:LieuService) { }

  ngOnInit() {
    // this._id = this.route.snapshot.params['id'];
    this.loadAvisList(this._id);
    // this.loadLieu(this._id);
  }


  get id(): number {
    return this._id;
  }
  @Input()
  set id(value: number) {
    this._id = value;
  }

  get lieu(): Lieu {
    return this._lieu;
  }
  @Input()
  set lieu(value: Lieu) {
    this._lieu = value;
  }

  get listAvis(): Avis[] {
    return this._listAvis;
  }

  set listAvis(value: Avis[]) {
    this._listAvis = value;
  }

  private loadAvisList(id:number) {
    const sub = this.avisService.getAvisFromAnUser(id).subscribe(
      listA => this._listAvis = listA.map(a =>  new Avis().fromAvisDto(a))
    );
  }

  private loadLieu(id: number) {
    const sub = this.lieuService.get(id).subscribe( lieu => this._lieu = new Lieu().fromLieuDto(lieu));
  }
}
