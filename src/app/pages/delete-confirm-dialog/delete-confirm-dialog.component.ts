import { Component, OnInit } from '@angular/core';
import {NbDialogRef, NbWindowRef} from "@nebular/theme";

@Component({
  selector: 'gh-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.scss']
})
export class DeleteConfirmDialogComponent implements OnInit {

  constructor(public ref: NbDialogRef<DeleteConfirmDialogComponent>,) { }

  ngOnInit(): void {
  }

  submit(choice: boolean) {
    this.ref.close(choice)
  }
}
