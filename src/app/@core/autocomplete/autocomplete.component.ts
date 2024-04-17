import {
  Component,
  ElementRef,
  EventEmitter, Input, Output,
} from '@angular/core';
import {Application} from "../../types/application";

@Component({
  selector: 'app-autocomplete',
  template: `
    <div class="typeHead ">
      <input nbInput class="bg-white" fullWidth type="text" [(ngModel)]="searchTerm" placeholder="Application name"  (input)="filterApplicationList()" (focus)="filterApplicationList()">
      <div class="option-list nb-option-list autocomplete">
        <ul *ngIf="filteredResult.length>0"  >
          <li *ngFor="let c of filteredResult" (click)="selectItem(c)">
            <span *ngFor="let label of searchLabels">{{c[label]}} </span>
          </li>
        </ul>
      </div>
    </div>
  `,
  exportAs: 'appAutocomplete',
  styleUrls: ['./autocomplete.component.scss'],
  host: {
    '(document:click)': 'closeAutocompleteDiv($event)',
  }
})
export class AutocompleteComponent {
  public _el;
  @Input() data: any[] =[];
  @Input() searchLabels: string[]=[];
  searchTerm: string = '';
  filteredResult: any[] = [];
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor(el: ElementRef) {
    this._el = el;
  }

  ngOnInit() {
  }

  filterApplicationList() {
    const labels: string[]=this.searchLabels;
    if (this.searchTerm && this.searchTerm !== '') {
      let _term = this.searchTerm.toLowerCase();
      if (labels.length>1){
        this.filteredResult = this.data.filter(function (el: any) {
          return el[labels[0]].toLowerCase().indexOf(_term.toLowerCase()) > -1 || el[labels[1]].toLowerCase().indexOf(_term.toLowerCase()) > -1;
        });
      } else {
        this.filteredResult = this.data.filter(function (el: any) {
          return el[labels[0]].toLowerCase().indexOf(_term.toLowerCase()) > -1;
        });
      }

    } else {
      this.filteredResult = this.data;
    }
  }


  selectItem(app: any) {
    this.searchTerm=''
    this.searchLabels.forEach(label=>{
      this.searchTerm+=' ' + app[label];
    })
    this.onSelect.emit(app)
    this.filteredResult = [];
  }

  closeAutocompleteDiv(event: { target: any; }) {
    let _event = event.target;
    let _in = false;

    do {
      if (_event === this._el.nativeElement) {
        _in = true;
      }
      _event = _event.parentNode;
    }
    while (_event);
    if (!_in) {
      this.filteredResult = [];
    }
  }

}
