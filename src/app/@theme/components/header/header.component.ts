import { Component, OnInit } from '@angular/core';
import {NbSidebarService} from "@nebular/theme";
import {debounceTime, delay, map, Observable, shareReplay, Subject} from "rxjs";
import {mapOneOrManyArgs} from "rxjs/internal/util/mapOneOrManyArgs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  username = 'TIJANI Fadwa'

  constructor(private sidebarService: NbSidebarService) { }
  protected layoutSize$ = new Subject();
  protected layoutSizeChange$ = this.layoutSize$.pipe(
    shareReplay({ refCount: true }),
  );


  changeLayoutSize() {
    this.layoutSize$.complete();
  }

  onChangeLayoutSize(): Observable<any> {
    return this.layoutSizeChange$.pipe(delay(1));
  }

  onSafeChangeLayoutSize(): Observable<any> {
    return this.layoutSizeChange$.pipe(
      debounceTime(350),
    );
  }

  ngOnInit(): void {
    // this.userService.getUser().subscribe({next:data =>{
        // this.username= data.matricule+' '+ this.authService.getLoggedUser()?.['preferred_username'];

    // }})


    // console.log(this.authService.getToken())
    // console.log(this.authService.getLoggedUser())
  }
  logout(){
    // this.authService.logout();
    sessionStorage.removeItem("USER_PROFILE")
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.changeLayoutSize();

    return false;
  }


}
