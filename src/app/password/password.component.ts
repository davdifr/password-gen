import { Component, inject, OnInit } from '@angular/core';
import { PasswordService } from './services/password.service';
import { FormComponent } from './components/form/form.component';
import { LucideAngularModule } from 'lucide-angular';
import { PasswordOptionsInterface } from './types/password-options.interface';
import { DisplayComponent } from './components/display/display.component';
import { CopyButtonComponent } from './components/copy-button/copy-button.component';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [
    FormComponent,
    DisplayComponent,
    CopyButtonComponent,
    LucideAngularModule,
  ],
  templateUrl: './password.component.html',
})
export class PasswordComponent implements OnInit {
  #passwordService = inject(PasswordService);
  password!: string;

  generatePassword(options: PasswordOptionsInterface) {
    this.password = this.#passwordService.generatePassword(options);
  }

  ngOnInit(): void {
    // Generate a password when the component is initialized
    this.generatePassword({
      length: 12,
      characterTypes: {
        numbers: false,
        symbols: false,
        lowercase: true,
        uppercase: false,
      },
    });
  }
}
