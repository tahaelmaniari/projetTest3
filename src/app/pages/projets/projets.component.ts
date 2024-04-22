import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.css']
})
export class ProjetsComponent implements OnInit {
  status ! : any;
  nb : any
  constructor(private route : ActivatedRoute,private router : Router) { }
  ngOnInit(): void {
    this.status = 0;
    this.route.params.subscribe(params => {
        if (params['status']) {
            const s = params['status'];
            console.log(s);
            this.status = s
        }
        if (params['nombreProjet']) {
          const s = params['nombreProjet'];
          console.log(s);
          this.nb = Array.from({length: s}, (_, index) => index + 1);
        }
    });
   
}
choice(): void {
  console.log(this.status);
  if(this.status == 'Initiation Projet')
    {
      this.nb = Array.from({length: 20}, (_, index) => index + 1);
      this.router.navigate(['pages/projets/'+this.status+'/'+'2'])
    }
    else if(this.status == 'Enrichissement Données')
      {
        this.nb = Array.from({length: 6}, (_, index) => index + 1);
        this.router.navigate(['pages/projets/'+this.status+'/'+'4'])
      }
      else if(this.status == 'Attente Retour(Achat Delegue)')
        {
          this.nb = Array.from({length: 10}, (_, index) => index + 1);
          this.router.navigate(['pages/projets/'+this.status+'/'+'3'])
        }  
        else if(this.status == 'Adjudication')
          {
            this.nb = Array.from({length: 6}, (_, index) => index + 1);
            this.router.navigate(['pages/projets/'+this.status+'/'+'4'])
          }
          else if(this.status == 'Attente Retour (Fournisseur)')
            {
              this.nb = Array.from({length: 10}, (_, index) => index + 1);
              this.router.navigate(['pages/projets/'+this.status+'/'+'4'])
            }  
            else if(this.status == 'Lancement P2P')
              {
                this.nb = Array.from({length: 10}, (_, index) => index + 1);
                this.router.navigate(['pages/projets/'+this.status+'/'+'3'])
              }
}
}
 