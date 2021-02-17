import { Service } from './../../model/service.model';
import { Component, OnInit , Optional, Inject} from '@angular/core';
import { UserserviceService } from 'src/app/service/userservice.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})

export class ViewUserComponent implements OnInit {

  displayedColumns: string[] = ['name', 'description', 'amount'];
  dataSource = [];

  userData: any ;
  urlResponse;
  baseUrl = 'http://dev.bluebell.com/';

  constructor(public service: UserserviceService, public dialog: MatDialogRef<ViewUserComponent> ,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.userData = data;
    this.dataSource = data['relation'];
  }

  department = [
    {id: 1, name: 'Web'},
    {id: 2, name: 'Mobile'},
    {id: 3, name: 'Bussiness'},
  ];

  closeDialog(): void {
    this.dialog.close();
  }

  ngOnInit(): void {
  }
}
