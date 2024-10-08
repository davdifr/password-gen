import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-copy-button',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './copy-button.component.html',
})
export class CopyButtonComponent {
  @Input({ required: true }) password!: string;
  buttonText = 'Copy Password';

  onClick() {
    navigator.clipboard.writeText(this.password);
    this.buttonText = 'Copied!';

    setTimeout(() => {
      this.buttonText = 'Copy Password';
    }, 3000);
  }
}
