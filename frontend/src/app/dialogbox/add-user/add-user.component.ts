import { NotificationService } from './../../service/notification.service';
import { Component, OnInit } from '@angular/core';
import {UserserviceService} from '../../service/userservice.service';
import {MatDialog, MatDialogRef,   MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(public service: UserserviceService, public dialog: MatDialogRef<AddUserComponent> ,
              private notifyService: NotificationService ) {}
  selectfile: any ;
  myForm = this.service.form;
  imageSrc: string;
  userDetails;
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

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.myForm.patchValue({
          fileSource: reader.result
        });
      };
    }
  }

  closeDialog(): void {
    this.dialog.close();
    this.service.form.reset();
  }


  onSubmit(): void {
    const formData = new FormData();

    formData.append('userimage' , this.selectfile , this.selectfile.name );
    formData.append('data' , JSON.stringify(this.myForm.value) );

    this.service.addUser(formData).subscribe( data => {

      this.userDetails = (data);
      if ((this.userDetails).status === 'success'){
        this.dialog.close();
        this.service.form.reset();
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
