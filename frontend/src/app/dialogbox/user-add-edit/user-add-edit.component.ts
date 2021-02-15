import { Optional } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder  , Validators } from '@angular/forms';
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
  serviceList = [];
  serviceModel = new Service();
  public myForm: FormGroup;
  baseUrl = 'http://dev.bluebell.com/';
  urlResponse;
  userDetails;
  title ;

  constructor(public service: UserserviceService, public dialog: MatDialogRef<UserAddEditComponent> ,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private formBuilder: FormBuilder,
              private notifyService: NotificationService ) {

    this.userData = data;
    this.serviceList = data['relation'];

    if (!this.userData){
      this.title = 'Add new user details';
    }else{
      this.title = 'Edit user details';
    }
  }

  department = [
    {id: 'Web', name: 'Web'},
    {id: 'Mobile', name: 'Mobile'},
    {id: 'Bussiness', name: 'Bussiness'},
  ];

  closeDialog(): void {
    this.dialog.close();
    this.myForm.reset();
  }
// console.log(this.myForm.value);
// formData.append('data' , JSON.stringify(this.myForm.value) );

// formData.append('userId' , (this.myForm.value).key );
// formData.append('_method', 'PUT');
  onSubmit(): void {

    const formData = new FormData();
    const formValue = this.myForm.value;

    if (!formValue.key){
      this.service.addUser(formValue).subscribe( data => {
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
      this.service.updateUserDetails(formValue).subscribe(data => {
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

// ===================================

  // tslint:disable-next-line:typedef
  ngOnInit() {
      if (!this.userData){
        this.title = 'Add new user details';
        this.myForm = this.formBuilder.group({
          key : new FormControl(null),
          firstname : new FormControl('', Validators.required),
          lastname : new FormControl('', Validators.required),
          email : new FormControl('', [Validators.required , Validators.email]),
          department : new FormControl('', Validators.required),
          gender : new FormControl('1', Validators.required),
          dateofbirth : new FormControl('', Validators.required),
          isPermanent : new FormControl('', Validators.required),
          itemRows: this.formBuilder.array([this.initItemRows()])
        });
      }else{
        this.title = 'Edit user details';

        this.myForm = this.formBuilder.group({
          key : new FormControl(this.userData.id),
          firstname : new FormControl(this.userData.firstname, Validators.required),
          lastname : new FormControl(this.userData.lastname, Validators.required),
          email : new FormControl(this.userData.email, [Validators.required , Validators.email]),
          department : new FormControl(this.userData.department, Validators.required),
          gender : new FormControl(this.userData.gender, Validators.required),
          dateofbirth : new FormControl(this.userData.birthdate, Validators.required),
          isPermanent : new FormControl(this.userData.isPermanent, Validators.required),
          itemRows: this.formBuilder.array([this.initItemRows()])
        });

      }
  }

  // tslint:disable-next-line:typedef
  get formArr() {
    return this.myForm.get('itemRows') as FormArray;
  }

  // tslint:disable-next-line:typedef
  initItemRows() {
    return this.formBuilder.group({
      service_name: ['', Validators.required],
      service_description: ['', Validators.required],
      service_amount: ['', Validators.required]
    });
  }

  // tslint:disable-next-line:typedef
  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  // tslint:disable-next-line:typedef
  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }
}
