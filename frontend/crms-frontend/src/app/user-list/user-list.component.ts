import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserStatusComponent } from '../user-status/user-status.component';
import { UserService } from '../services/user.service';
import { FilterSortData } from '../models/filter-sort-data.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  filterSortData: FilterSortData = {
    filterInfo: {
      id: null,
      name: null,
      email: null,
      tel: null,
      address: null,
      status: null,
      createdDateTime: null
    },
    sortCol: {}
  };
  // [{
  //   id: "1",
  //   name: "Anne",
  //   email: "anne@gmail.com",
  //   tel: "0772494333",
  //   address: "Colombo",
  //   status: "active",
  //   createdDateTime: "2022-05-03 02:34:34"
  // },
  // {
  //   id: "2",
  //   name: "John",
  //   email: "john@gmail.com",
  //   tel: "0772434333",
  //   address: "Gampaha",
  //   status: "lead",
  //   createdDateTime: "2022-08-03 02:34:34"
  // },
  // {
  //   id: "3",
  //   name: "Paul",
  //   email: "paul@gmail.com",
  //   tel: "0772467333",
  //   address: "Colombo",
  //   status: "nonactive",
  //   createdDateTime: "2022-03-03 02:34:34"
  // }];

  constructor(private modalService: NgbModal, 
              private toastr: ToastrService, 
              private spinnerService: NgxSpinnerService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  /** Retrieves users from backend. */
  getUsers() {
    this.spinnerService.show();
    this.userService.getFilteredSortedUsers(this.filterSortData).subscribe((response) => {
      this.users = response;
      this.spinnerService.hide();
    }, (error) => {
      this.spinnerService.hide();
      this.toastr.error("Error occurred while retrieving users.", "User Retrieval Failed");
    });
  }

  /** Opens modal to change user's status. */
  openModal(userId: string, status: string) {
    const modalRef = this.modalService.open(UserStatusComponent);
    modalRef.componentInstance.selectedUserId = userId;
    modalRef.componentInstance.currentStatus = status;
    modalRef.result.then((result) => {
      if (result == 'success') {
        this.resetFilterSortData();
        this.getUsers();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  /** Resets user data filtering and sorting conditions. */
  resetFilterSortData() {
    this.filterSortData = {
      filterInfo: {
        id: null,
        name: null,
        email: null,
        tel: null,
        address: null,
        status: null,
        createdDateTime: null
      },
      sortCol: {}
    };
  }

}
