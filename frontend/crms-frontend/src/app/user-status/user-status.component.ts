import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.css']
})
export class UserStatusComponent implements OnInit {
  @Input() selectedUserId: string = "";
  @Input() currentStatus: string = "";

  constructor(private activeModal: NgbActiveModal,
              private toastr: ToastrService, 
              private spinnerService: NgxSpinnerService,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  /** Updates status of a particular user. */
  updateUserStatus() {
    this.spinnerService.show();
    this.userService.updateUserStatus(this.selectedUserId, { "status" : this.currentStatus }).subscribe((response) => {
      this.spinnerService.hide();
      this.toastr.success("Updating user status succeeded.", "User Status Update Success");
      this.closeModal('success');
    }, (error) => {
      console.log(error);
      this.spinnerService.hide();
      this.toastr.error("Error occurred while updating user status.", "User Status Update Failed");
      this.closeModal('error');
    });
  }

  /** Closes modal. */
  closeModal(result: string = 'Modal closed') {
    this.activeModal.close(result);
  }

}
