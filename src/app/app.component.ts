import { Component } from '@angular/core';
import { PasswordService } from './password.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'password-gen';

  password = '';
  buttonText = 'Copy Password';

  length = 24;
  numbers = false;
  symbols = false;
  lowercase = true;
  uppercase = false;

  constructor(private passwordService: PasswordService) {}

  onGeneratePasswordClick() {
    try {
      this.password = this.passwordService.generatePassword(
        this.length,
        this.numbers,
        this.symbols,
        this.lowercase,
        this.uppercase
      );

      this.buttonText = 'Copy Password';
    } catch (error) {
      // Display error to the user
      alert(
        'An error occurred while generating the password. Please try again.'
      );
    }
  }

  onCopyPasswordClick() {
    navigator.clipboard.writeText(this.password);
    this.buttonText = 'Copied!';

    // Reset button text after 3 seconds
    setTimeout(() => {
      this.buttonText = 'Copy Password';
    }, 3000);
  }
}
