import {Component, OnInit} from '@angular/core';
import {Criteria} from "../../../types/criteria";
import {Request} from "../../../types/request";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  source: Request[]=[];
  profile!: any;
  criteria!: Criteria;


  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,) { }

  ngOnInit(): void {
    //this.profile=this.userService.getUserProfile();
    this.initRequests();

  }

  initRequests(){
    this.activatedRoute.data.subscribe((data)=>{
      const status=data['status']
      console.log('************************************')
      console.log(status)
      if (status==="En cours"){
        this.criteria={
          status: [status],
        }
      }
      if(status==='A approuver validateur'){
        this.criteria={
          status: [status],
        }
      } else if(status==='Cloturées'){
        this.criteria={
          status: ['Cloturée'],
        }
      } else if(status==='Réjetées'){
        this.criteria={
          status: ['Rejetée'],
        }
      } else if(status==='A completer'){
        this.criteria={
          status: [status],
        }
      } else if(status==='A approuver RH'){
        this.criteria={
          status: [status],
        }
      }else if (status==='A approuver HRBP'){
        this.criteria={
          status: [status],
        }
      } else if (status==='Retirées'){
        this.criteria={
          status: ['Retirée'],
        }
      }
      else if (status==='tout'){
        this.criteria={
          status: ['tout']
        }
      }
    })
  }

}
