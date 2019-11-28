import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-form-inscription',
  templateUrl: './form-inscription.component.html',
  styleUrls: ['./form-inscription.component.css']
})
export class FormInscriptionComponent implements OnInit {
  formulaireInscription: FormGroup = this.fb.group({
    emailInscription : this.fb.control("",Validators.required),
    nom : this.fb.control("",Validators.required),
    prenom : this.fb.control("",Validators.required),
    motDePasse : this.fb.control("",Validators.required),
    verifMotDePasse : this.fb.control("",Validators.required),
    numero : this.fb.control("",Validators.required),
    rue : this.fb.control("",Validators.required),
    codePostal : this.fb.control("",Validators.required),
    ville : this.fb.control("",Validators.required),
  });

  constructor(public fb : FormBuilder) { }

  ngOnInit() {
  }

  alertME() {
      console.log(this.formulaireInscription.controls.emailInscription.value);
  }

  verifMDP() {
    if(this.formulaireInscription.controls.motDePasse.value !== this.formulaireInscription.controls.verifMotDePasse.value)
    {
      return "Le mot de passe ne correspond pas !";
    }

  }
}
