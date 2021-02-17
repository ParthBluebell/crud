import { Component, OnInit , Output , EventEmitter , Input } from '@angular/core';
import { Service } from './../../model/service.model';

@Component({
  selector: 'app-user-services',
  templateUrl: './user-services.component.html',
  styleUrls: ['./user-services.component.css']
})
export class UserServicesComponent implements OnInit {
  @Output() serviceData: EventEmitter<any> = new EventEmitter();

  @Input() setServiceData;

  service = new Service();
  dataarray = [];

  constructor() { }

  addService(){
    this.service = new Service();
    this.dataarray.push(this.service);
  }

  removeService(index){
    this.dataarray.splice(index, 1);
  }


  ngOnInit(): void {


    if(this.setServiceData){
        this.dataarray = this.setServiceData;
    }else{
      this.service = new Service();
      this.dataarray.push(this.service);
    }
    this.serviceData.emit(this.dataarray);
  }

}
