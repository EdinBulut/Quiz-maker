import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogVariables } from 'src/app/shared/models/dialog-variables.model';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  isClosed = false

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogVariables: DialogVariables,
    private matDialogRef: MatDialogRef<ConfirmDialogComponent>
  ) { }


  ngOnInit(): void {
    
  }





  closeDialog(isConfirmed?: boolean) {
    this.isClosed = true
    this.matDialogRef.close(isConfirmed)
  }
}
