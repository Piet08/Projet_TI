import {Component, Input, OnInit} from '@angular/core';
import {Avis} from '../Avis';
import {Utilisateur} from '../../../Utilisateur/Utilisateur';
import {UtilisateurService} from '../../../Utilisateur/utilisateur.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-detail-comment',
  templateUrl: './detail-comment.component.html',
  styleUrls: ['./detail-comment.component.css']
})
export class DetailCommentComponent implements OnInit {
  private _avis:Avis;
  private _utilisateur:Utilisateur = new Utilisateur();
  private subscriptions: Subscription[] = [];
  constructor(public utilService:UtilisateurService) { }
d
  ngOnInit() {
  }

  get avis(): Avis {
    return this._avis;
  }

  @Input()
  set avis(value: Avis) {
    this._avis = value;
    this.updateUtilisateur(this._avis.idutil);
  }

  get utilisateur(): Utilisateur {
    return this._utilisateur;
  }

  set utilisateur(value: Utilisateur) {
    this._utilisateur = value;
  }

  private updateUtilisateur(idutil: number) {
    const sub = this.utilService.get(idutil).subscribe(user => this._utilisateur = new Utilisateur().fromUtilisateurDto(user));
    this.subscriptions.push(sub);
  }
}
