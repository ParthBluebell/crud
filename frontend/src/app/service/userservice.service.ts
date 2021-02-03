import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Validators } from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  constructor(private apiData: HttpClient) { }

  form: FormGroup = new  FormGroup({
    // $key : new FormControl(null),
    firstname : new FormControl('', Validators.required),
    lastname : new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required , Validators.email]),
    department : new FormControl('', Validators.required),
    gender : new FormControl('1', Validators.required),
    dateofbirth : new FormControl('', Validators.required),
    isPermanent : new FormControl('', Validators.requiredTrue),
    userimage : new FormControl('', Validators.required),
  });


  url = 'http://dev.bluebell.com/';

  getUserList(pageSize , currentPage , sortColoum , sortOrder , filterValue){

    const queryParams = '?pageSize=' + pageSize + '&page=' + currentPage + '&sortColoum=' + sortColoum + '&sortOrder=' + sortOrder + '&filterValue=' + filterValue;
    const endPoint = 'api/get-user-list';
    return this.apiData.get(this.url + endPoint + queryParams);
  }

  baseUrl(){
    const endPoint = 'api/get-base-url';
    return this.apiData.get(this.url + endPoint);
  }

  addUser(postData){
    const endPoint = 'api/add-user';
    return this.apiData.post(this.url + endPoint, postData);
  }

  getUserDetails(userId){
    const endPoint = 'api/get-user-details';
    return this.apiData.post(this.url + endPoint, userId);
  }

  updateUserDetails(postData){
    const endPoint = 'api/edit-user';
    return this.apiData.post(this.url + endPoint, postData);
  }

  deleteUserDetail(userId){
    const endPoint = 'api/delete-user';
    return this.apiData.post(this.url + endPoint, userId);
  }
}

