import {Component, Input, OnInit} from '@angular/core';
import {Review} from '../review';
import {User} from '../../../User/user';
import {UserService} from '../../../User/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail-comment',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit {
  private _avis:Review;
  private _utilisateur:User = new User();
  private subscriptions: Subscription[] = [];
  constructor(public utilService:UserService) { }
d
  ngOnInit() {
  }

  get avis(): Review {
    return this._avis;
  }

  @Input()
  set avis(value: Review) {
    this._avis = value;
    this.updateUtilisateur(this._avis.idUser);
  }

  get utilisateur(): User {
    return this._utilisateur;
  }

  set utilisateur(value: User) {
    this._utilisateur = value;
  }

  private updateUtilisateur(idutil: number) {
    const sub = this.utilService.get(idutil).subscribe(user => this._utilisateur = new User().fromUtilisateurDto(user));
    this.subscriptions.push(sub);
  }
}
