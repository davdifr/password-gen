import { Component } from '@angular/core';
import { MainLayoutComponent } from './layout/main-layout.component';
import { PasswordComponent } from './password/password.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MainLayoutComponent, PasswordComponent],
  template: `
    <app-main-layout>
      <app-password />
    </app-main-layout>
  `,
})
export class AppComponent {}
