import { NotificationService } from './../../service/notification.service';
import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../../service/userservice.service';
import {MatDialog, MatDialogRef,   MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Optional } from '@angular/core';
import { Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  public userData: any ;
  userDetails;
  // tslint:disable-next-line:max-line-length
  constructor(public service: UserserviceService, public dialog: MatDialogRef<DeleteUserComponent> ,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private notifyService: NotificationService
  ){

    this.userData = data;
    // console.log(this.userData);
  }
  closeDialog(): void {
    this.dialog.close();
  }
  confirmDelete(userId){
    const formData = new FormData();

    this.service.deleteUserDetail(userId).subscribe(data => {
      // console.log(data);
      this.userDetails = (data);
      this.userDetails = (data);
      if ((this.userDetails).status === 'success'){
        this.dialog.close();
        this.notifyService.showSuccess((this.userDetails).message, (this.userDetails).status);
      }else{
        if ((this.userDetails).status === 'warning'){
          this.notifyService.showWarning((this.userDetails).message, (this.userDetails).status);
        }else{
          this.dialog.close();
          this.notifyService.showError((this.userDetails).message, (this.userDetails).status);
        }
      }
    });
  }
  ngOnInit(): void {
  }

}
