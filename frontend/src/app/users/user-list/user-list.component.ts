import { Component, OnInit , AfterViewInit , ViewChild } from '@angular/core';
import { UserserviceService } from '../../service/userservice.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewUserComponent } from './../../dialogbox/view-user/view-user.component';
import { DeleteUserComponent } from 'src/app/dialogbox/delete-user/delete-user.component';
import { UserAddEditComponent } from './../../dialogbox/user-add-edit/user-add-edit.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit  , AfterViewInit  {
  displayedColumns: string[] = ['firstname', 'lastname', 'email',  'birthdate', 'department' , 'gender', 'action'];
  userData;
  urlResponse;
  userList ;
  temUserDetails: any;
  userDetails = {};
  pageSizeOptions = ['5', '10', '25', '50' , '100'];
  defaultPageSize = 5;
  defaultPage = 1;

  startPageSize = this.defaultPageSize;
  startpage = this.defaultPage;
  totalRecord  ;
  baseUrl = 'http://dev.bluebell.com/';

  sortColoum = 'id';
  sortOrder = 'desc';
  filterValue = '';

  constructor(private details: UserserviceService, public dialog: MatDialog) {}

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event){
    this.filterValue = (event.target as HTMLInputElement).value;
    this.startPageSize = this.defaultPageSize;
    this.startpage = this.defaultPage;
    this.getUserList(this.startPageSize, this.startpage, this.sortColoum , this.sortOrder , this.filterValue);
  }

  openDialog(userId: number | null){
    if(userId == null){
      const dialogRef = this.dialog.open(UserAddEditComponent, {width: '75%' , height: '550px'  });
      dialogRef.afterClosed().subscribe(result => {
        this.refresh();
      });
    }else{
      this.details.getUserDetails(userId).subscribe(data => {
        this.temUserDetails = (data) ;
        this.userDetails = (this.temUserDetails).details;
        const dialogRef = this.dialog.open(UserAddEditComponent, {width: '75%' , height: '550px' ,  data :  this.userDetails[0] });
        dialogRef.afterClosed().subscribe(result => {
          this.refresh();
        });
      });
    }
  }

  openViewUserDetails(userId){
    this.details.getUserDetails(userId).subscribe(data => {
      this.temUserDetails = (data) ;
      this.userDetails = (this.temUserDetails).details;
      const dialogRef = this.dialog.open(ViewUserComponent, {width: '75%' , height: '550px' ,  data :  this.userDetails[0] });
    });
  }

  openDeleteUserDetails(userId){
    this.details.getUserDetails(userId).subscribe(data => {
      this.temUserDetails = (data) ;
      this.userDetails = (this.temUserDetails).details;
      const dialogRef = this.dialog.open(DeleteUserComponent, {width: '50%' , data :  this.userDetails[0] });
      dialogRef.afterClosed().subscribe(result => {
        this.refresh();
      });
    });
  }

  ngAfterViewInit(): void {
    this.getUserList(this.startPageSize, this.startpage, this.sortColoum , this.sortOrder, this.filterValue);
  }

  refresh() {
    this.getUserList(this.startPageSize, this.startpage, this.sortColoum , this.sortOrder, this.filterValue);
  }

  sortData(sortEvent){
    this.sortColoum = sortEvent.active;
    this.sortOrder = sortEvent.direction;
    this.startPageSize = this.defaultPageSize;
    this.startpage = this.defaultPage;
    this.getUserList(this.startPageSize, this.startpage, this.sortColoum , this.sortOrder , this.filterValue);
  }

  onPaginate(pageEvent: PageEvent){
    this.startPageSize = pageEvent.pageSize;
    this.startpage = pageEvent.pageIndex + 1;
    this.getUserList(this.startPageSize, this.startpage, this.sortColoum , this.sortOrder , this.filterValue);
  }

  getUserList(pageSize: number, page: number , sortColoum: string , sortOrder: string , filterValue: string){
    this.details.getUserList(pageSize , page , sortColoum , sortOrder , filterValue).subscribe(data => {
      this.userData = (data);
      this.userList = new MatTableDataSource(((this.userData).userDetails).data);
      this.totalRecord = ((this.userData).userDetails).total ;
      this.userList.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }
}
