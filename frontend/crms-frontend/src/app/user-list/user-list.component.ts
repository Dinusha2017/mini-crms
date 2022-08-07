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
  currentSortCol: string = "";
  currentSortOrder: number = 0;
  currentHoverElement: string = "";

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
        this.clearFilterSortData();
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  /** Handles sorting of data in user list. */
  handleSorting(column: string) {
    if (column == "createdDateTime" || column == "actions") {
      this.clearFilterSortData();
      return;
    }

    // 1 represents ascending and -1 represents descending
    if (this.currentSortCol == column && this.currentSortOrder == 1) {
      this.currentSortOrder = -1;
    } else if (this.currentSortCol == column && this.currentSortOrder == -1) {
      this.currentSortOrder = 1;
    } else {
      this.currentSortOrder = 1;
    }

    // sets initial column and when sorted by a new column
    if (this.currentSortCol == "" || this.currentSortCol != column) {
      this.currentSortCol = column;
    }

    this.setSortData();

    this.getUsers();
  }

  /** Sets sort data to object. */
  setSortData() {
    this.filterSortData.sortCol = {};
    this.filterSortData.sortCol[this.currentSortCol] = this.currentSortOrder;
  }

  /** Handles table header hovering to display arrows appropriately. */
  handleTableHeaderHover(column: string, event: string) {
    if (event == "mouseenter") {
      this.currentHoverElement = column;
    } else {
      this.currentHoverElement = "";
    }
  }

  /** Clear filter and sort data,
   * Reset data in table
   */
  clearFilterSortData() {
    this.resetFilterSortData();
    this.getUsers();
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
