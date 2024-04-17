import { Component, OnInit } from '@angular/core';
import {MENU_ITEMS} from "./pages-menu";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private route: ActivatedRoute) {

  }
  menu=MENU_ITEMS

  ngOnInit(): void {
  }

}
