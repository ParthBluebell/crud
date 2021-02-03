import { Component, OnInit , Optional, Inject} from '@angular/core';
import { UserserviceService } from 'src/app/service/userservice.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userData: any ;
  urlResponse;
  baseUrl = {};
  // tslint:disable-next-line:max-line-length
  constructor(public service: UserserviceService, public dialog: MatDialogRef<ViewUserComponent> ,@Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.userData = data;
    this.service.baseUrl().subscribe(basrUrl => {
      this.urlResponse = (basrUrl);
      this.baseUrl = (this.urlResponse).baseurl;
    });
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
    // console.log(this.userData);
  }

}