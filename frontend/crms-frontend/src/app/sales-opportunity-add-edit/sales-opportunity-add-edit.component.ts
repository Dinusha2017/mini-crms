import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesOpportunity } from '../models/sales-opportunity.model';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-sales-opportunity-add-edit',
  templateUrl: './sales-opportunity-add-edit.component.html',
  styleUrls: ['./sales-opportunity-add-edit.component.css']
})
export class SalesOpportunityAddEditComponent implements OnInit {
  @Input() action: string = "";
  @Input() selectedUserId: string = "";
  @Input() selectedSalesOpportunity: SalesOpportunity = {
    _id: "", 
    name: "", 
    status: ""
  };

  constructor(private activeModal: NgbActiveModal,
              private toastr: ToastrService, 
              private spinnerService: NgxSpinnerService,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  /** Handle adding or updating a sales opportunity. */
  addUpdateSalesOpportunity() {
    if (this.action == 'Add') {
      this.addSalesOpportunity();
    } else {
      this.updateSalesOpportunity();
    }
  }

  /** Adds a sales opportunity to a particular user. */
  addSalesOpportunity() {
    this.spinnerService.show();
    this.userService.addSalesOpportunity(this.selectedUserId, this.selectedSalesOpportunity).subscribe((response) => {
      this.spinnerService.hide();
      this.toastr.success("Adding sales opportunity of user succeeded.", "Insert Sales Opportunity Success");
      this.closeModal('success');
    }, (error) => {
      console.log(error);
      this.spinnerService.hide();
      this.toastr.error("Error occurred while adding sales opportunity of user.", "Insert Sales Opportunity Failed");
      this.closeModal('error');
    });
  }

  /** Updates a sales opportunity of a particular user. */
  updateSalesOpportunity() {
    this.spinnerService.show();
    this.userService.updateSalesOpportunity(this.selectedUserId, this.selectedSalesOpportunity).subscribe((response) => {
      this.spinnerService.hide();
      this.toastr.success("Updating sales opportunity of user succeeded.", "Sales Opportunity Update Success");
      this.closeModal('success');
    }, (error) => {
      console.log(error);
      this.spinnerService.hide();
      this.toastr.error("Error occurred while updating sales opportunity of user.", "Sales Opportunity Update Failed");
      this.closeModal('error');
    });
  }

  /** Closes modal. */
  closeModal(result: string = 'Modal closed') {
    this.activeModal.close(result);
  }

}
