import { Component } from '@angular/core';
import { PasswordService } from './services/password/password.service';
import {
  Form,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'password-gen';

  form: FormGroup;
  password?: string;
  buttonText = 'Copy Password';
  subscription?: Subscription;

  constructor(
    private passwordService: PasswordService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      length: [32],
      numbers: [false],
      symbols: [false],
      lowercase: [true],
      uppercase: [false],
    });
  }

  ngOnInit() {
    this.generatePassword(this.form.value);

    this.subscription = this.form.valueChanges.subscribe((values) =>
      this.generatePassword(values)
    );
  }

  generatePassword(values: any) {
    this.password = this.passwordService.generatePassword(
      values.length,
      values.numbers,
      values.symbols,
      values.lowercase,
      values.uppercase
    );
  }

  onCopyPasswordClick() {
    if (!this.password) return;

    navigator.clipboard.writeText(this.password);
    this.buttonText = 'Copied!';

    // Reset button text after 3 seconds
    setTimeout(() => {
      this.buttonText = 'Copy Password';
    }, 3000);
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
