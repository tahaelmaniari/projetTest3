import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from "./pages-menu";
import {MenuGeneratorService} from "../services/menu-generator.service";
import {UserService} from "../services/user.service";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private menuGenerator: MenuGeneratorService,
              private usersService: UserService,
              private authService: AuthService,
              private route: ActivatedRoute) {

  }
  menu=MENU_ITEMS

  ngOnInit(): void {
    this.menuGenerator.getMenuItems().subscribe(items => {
      this.menu = items;
    });
  }

}
