import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { SalesOpportunityAddEditComponent } from '../sales-opportunity-add-edit/sales-opportunity-add-edit.component';
import { UserService } from '../services/user.service';
import { SalesOpportunity } from '../models/sales-opportunity.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  selectedUserId: string = "";
  user: User = {
    id: "",
    name: "",
    email: "",
    tel: "",
    address: "",
    status: "",
    createdDateTime: "",
    salesOpportunities: []
  };

  constructor(private route: ActivatedRoute, 
              private modalService: NgbModal, 
              private toastr: ToastrService,
              private spinnerService: NgxSpinnerService, 
              private userService: UserService) {
                let userId = this.route.snapshot.paramMap.get("id")
                this.selectedUserId = userId != null ? userId : "";
  }

  ngOnInit(): void {
    this.getUserById(this.selectedUserId);
  }

  /** Retrieves details of a particular user by ID. */
  getUserById(id: string) {
    this.spinnerService.show();
    this.userService.getUserById(id).subscribe((response) => {
      this.user = response;
      this.spinnerService.hide();
    }, (error) => {
      this.spinnerService.hide();
      this.toastr.error("Error occurred while retrieving user details.", "User Detail Retrieval Failed");
    });
  }

  /** Opens the modal to add or edit a Sales Opportunity. */
  openModal(action: string, salesOpportunity: SalesOpportunity = {_id: "", name: "", status: ""}) {
    const modalRef = this.modalService.open(SalesOpportunityAddEditComponent);
    modalRef.componentInstance.action = action;
    modalRef.componentInstance.selectedUserId = this.selectedUserId;
    if (action == "Edit") {
      modalRef.componentInstance.selectedSalesOpportunity = salesOpportunity;
    }
    modalRef.result.then((result) => {
      if (result == 'success') {
        this.getUserById(this.selectedUserId);
      }
    }).catch((error) => {
      console.log(error);
    });
  }

}
