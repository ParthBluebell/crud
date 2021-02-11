import { Optional } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification.service';
import { UserserviceService } from 'src/app/service/userservice.service';
import { Service } from './../../model/service.model';
@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  public userData = null;
  dataArry = [];

  serviceModel = new Service();
  public addmore: FormGroup;
  baseUrl = 'http://dev.bluebell.com/';
  urlResponse;
  userDetails;
  title ;


  department = [
    {id: 'Web', name: 'Web'},
    {id: 'Mobile', name: 'Mobile'},
    {id: 'Bussiness', name: 'Bussiness'},
  ];

  myForm = new  FormGroup({
    key : new FormControl(null),
    firstname : new FormControl('', Validators.required),
    lastname : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required , Validators.email]),
    department : new FormControl('', Validators.required),
    gender : new FormControl('1', Validators.required),
    dateofbirth : new FormControl('', Validators.required),
    isPermanent : new FormControl('', Validators.required),
  });

  constructor(public service: UserserviceService, public dialog: MatDialogRef<UserAddEditComponent> ,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private notifyService: NotificationService ) {
      this.userData = data;
      if (!this.userData){
        this.title = 'Add new user details';
      }else{
        this.title = 'Edit user details';
        this.myForm = new  FormGroup({
          key : new FormControl(this.userData.id),
          firstname : new FormControl(this.userData.firstname, Validators.required),
          lastname : new FormControl(this.userData.lastname, Validators.required),
          email : new FormControl(this.userData.email, [Validators.required , Validators.email]),
          department : new FormControl(this.userData.department, Validators.required),
          gender : new FormControl(this.userData.gender, Validators.required),
          dateofbirth : new FormControl(this.userData.birthdate, Validators.required),
          isPermanent : new FormControl(this.userData.isPermanent, Validators.required),
        });
      }
    }


  closeDialog(): void {
    this.dialog.close();
    this.myForm.reset();
  }

  addService() {
    this.serviceModel = new Service();
    this.dataArry.push(this.serviceModel);
  }

  removeService(index) {
    // alert(index);
    this.dataArry.splice(index);
  }

  onSubmit(): void {
    const formData = new FormData();
    const formValue = this.myForm.value;

    formData.append('data' , JSON.stringify(this.myForm.value) );

    if (!formValue.key){
      this.service.addUser(formData).subscribe( data => {
        this.userDetails = (data);
        if ((this.userDetails).status === 'success'){
          this.dialog.close();
          this.myForm.reset();
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
    }else{
      formData.append('userId' , (this.myForm.value).key );
      formData.append('_method', 'PUT' );

      this.service.updateUserDetails(formData).subscribe(data => {
        this.userDetails = (data);
        if ((this.userDetails).status === 'success'){
          this.dialog.close();
          this.myForm.reset();
          this.notifyService.showSuccess((this.userDetails).message, (this.userDetails).status);
        }else{
          if ((this.userDetails).status === 'warning'){
            this.notifyService.showWarning((this.userDetails).message, (this.userDetails).status);
          }else{
            this.dialog.close();
            this.myForm.reset();
            this.notifyService.showError((this.userDetails).message, (this.userDetails).status);
          }
        }
      });
    }
  }

  ngOnInit(): void {
    this.serviceModel = new Service();
    this.dataArry.push(this.serviceModel);
  }
}
