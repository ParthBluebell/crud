import { Component, OnInit , Optional, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserserviceService } from 'src/app/service/userservice.service';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  public userData: any ;
  urlResponse;
  baseUrl = {};
  selectfile: any ;
  imageSrc: string;
  imageChange = false;
  userDetails;

  editForm = new  FormGroup({
    key : new FormControl(null),
    firstname : new FormControl('', Validators.required),
    lastname : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required , Validators.email]),
    department : new FormControl('', Validators.required),
    gender : new FormControl('1', Validators.required),
    dateofbirth : new FormControl('', Validators.required),
    isPermanent : new FormControl('', Validators.requiredTrue),
    userimage : new FormControl(''),
  });

  // tslint:disable-next-line:max-line-length
  constructor(public service: UserserviceService, public dialog: MatDialogRef<EditUserComponent> ,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
              private notifyService: NotificationService
  ){

    this.userData = data;

    this.service.baseUrl().subscribe(basrUrl => {
      this.urlResponse = (basrUrl);
      this.baseUrl = (this.urlResponse).baseurl;
      this.imageSrc = this.baseUrl + 'public/upload/user/' + this.userData.userimage;

      this.editForm = new  FormGroup({
        key : new FormControl(this.userData.id),
        firstname : new FormControl(this.userData.firstname, Validators.required),
        lastname : new FormControl(this.userData.lastname, Validators.required),
        email : new FormControl(this.userData.email, [Validators.required , Validators.email]),
        department : new FormControl(this.userData.department, Validators.required),
        gender : new FormControl(this.userData.gender, Validators.required),
        dateofbirth : new FormControl(this.userData.birthdate, Validators.required),
        isPermanent : new FormControl('', Validators.requiredTrue),
        userimage : new FormControl(''),
      });

    });
  }



  department = [
    {id: 'Web', name: 'Web'},
    {id: 'Mobile', name: 'Mobile'},
    {id: 'Bussiness', name: 'Bussiness'},
  ];



  onFileChange(event) {

    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.selectfile =  event.target.files[0];
      // console.log(this.selectfile);
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };
      this.imageChange = true;
    }
  }

  closeDialog(): void {
    this.dialog.close();
    this.service.form.reset();
  }

  onSubmit(){
    const formData = new FormData();

    if(this.imageChange){
      formData.append('userimage' , this.selectfile , this.selectfile.name );
    }

    formData.append('data' , JSON.stringify(this.editForm.value) );
    // console.log(formData);
    this.service.updateUserDetails(formData).subscribe(data => {
      // console.log(data);
      this.userDetails = (data);
      if ((this.userDetails).status === 'success'){
        this.dialog.close();
        this.editForm .reset();
        this.notifyService.showSuccess((this.userDetails).message, (this.userDetails).status);
      }else{
        if ((this.userDetails).status === 'warning'){
          this.notifyService.showWarning((this.userDetails).message, (this.userDetails).status);
        }else{
          this.dialog.close();
          this.editForm .reset();
          this.notifyService.showError((this.userDetails).message, (this.userDetails).status);
        }
      }
    });
  }
  ngOnInit(): void {
  }
}
