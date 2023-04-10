import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  public loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.dialogRef.close(this.loginForm.value);
    this.loginForm.reset();
  }
}
