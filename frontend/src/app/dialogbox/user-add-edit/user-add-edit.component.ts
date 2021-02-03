import { Optional } from '@angular/core';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/service/notification.service';
import { UserserviceService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css']
})
export class UserAddEditComponent implements OnInit {
  public userData = null;
  baseUrl;
  urlResponse;
  selectfile: any ;
  imageSrc: string;
  userDetails;
  title ;
  imageChange = false;

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
    isPermanent : new FormControl('', Validators.requiredTrue),
    userimage : new FormControl('', Validators.required),
  });

  constructor(public service: UserserviceService, public dialog: MatDialogRef<UserAddEditComponent> ,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private notifyService: NotificationService ) {
      this.userData = data;
      if (!this.userData){
        this.title = 'Add new user details';
      }else{
        this.title = 'Edit user details';

        this.service.baseUrl().subscribe(basrUrl => {
          this.urlResponse = (basrUrl);
          this.baseUrl = (this.urlResponse).baseurl;
          this.imageSrc = this.baseUrl + 'public/upload/user/' + this.userData.userimage;

          this.myForm = new  FormGroup({
            key : new FormControl(this.userData.id),
            firstname : new FormControl(this.userData.firstname, Validators.required),
            lastname : new FormControl(this.userData.lastname, Validators.required),
            email : new FormControl(this.userData.email, [Validators.required , Validators.email]),
            department : new FormControl(this.userData.department, Validators.required),
            gender : new FormControl(this.userData.gender, Validators.required),
            dateofbirth : new FormControl(this.userData.birthdate, Validators.required),
            isPermanent : new FormControl(this.userData.isPermanent, Validators.required),
            userimage : new FormControl(''),
          });
        });

      }
    }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectfile =  event.target.files[0];

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.myForm.patchValue({
          fileSource: reader.result
        });
      };
      this.imageChange = true;
    }
  }

  closeDialog(): void {
    this.dialog.close();
    this.myForm.reset();
  }


  onSubmit(): void {
    const formData = new FormData();
    const formValue = this.myForm.value;
    if (this.imageChange){
      formData.append('userimage' , this.selectfile , this.selectfile.name );
    }
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
  }

}
