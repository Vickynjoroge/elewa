import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CLMUsersService } from '@app/private/state/user/base';

@Component({
  selector: 'app-add-member-modal',
  templateUrl: './add-member-modal.component.html',
  styleUrls: ['./add-member-modal.component.scss'],
})
export class AddMemberModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AddMemberModalComponent>,
    private _fb: FormBuilder,
    private _CLMUserServ: CLMUsersService,
    @Inject(MAT_DIALOG_DATA) public data: { roles: string[] }
  ) {}

  emailForm = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
    roles: ['', [Validators.required]],
  });

  get email() {
    return this.emailForm.get('email') as FormControl;
  }

  get roles() {
    return this.emailForm.get('roles') as FormControl;
  }

  onCancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this._CLMUserServ.addUserToOrg(this.emailForm);

    // TODO: close modal on successful user addition.
    this.dialogRef.close();
  }
}
