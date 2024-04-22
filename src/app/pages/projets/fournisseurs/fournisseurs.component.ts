import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fournisseurs',
  templateUrl: './fournisseurs.component.html',
  styleUrls: ['./fournisseurs.component.css']
})
export class FournisseursComponent implements OnInit {
  nombreFournisseur : any;
  typeFournisseur : any;
  projetSelected : any;

  constructor(private route : ActivatedRoute) { }
  ngOnInit(): void {
    console.log('salam')
    this.route.params.subscribe(params => {
        if (params['nombreFournisseur']) {
            const s = params['nombreFournisseur'];
            console.log(s);
            this.nombreFournisseur = s
        }
        if (params['typeFournisseur']) {
          const s = params['typeFournisseur'];
          console.log(s);
          this.typeFournisseur = Array.from({length: s}, (_, index) => index + 1);
        }
        if (params['projetSelected']) {
          const s = params['projetSelected'];
          console.log(s);
          this.typeFournisseur = Array.from({length: s}, (_, index) => index + 1);
        }
    });
  }

}
