import { Component, Input } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-display',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './display.component.html',
})
export class DisplayComponent {
  @Input({ required: true }) password!: string;
}
