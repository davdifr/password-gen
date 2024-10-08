import {
  Component,
  EventEmitter,
  inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { PasswordOptionsInterface } from '../../types/password-options.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [NgStyle, ReactiveFormsModule],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit, OnDestroy {
  @Output() passwordOptions = new EventEmitter<PasswordOptionsInterface>();

  #fb = inject(FormBuilder);
  #passwordSubscription!: Subscription;
  passwordForm: FormGroup;

  constructor() {
    this.passwordForm = this.#fb.group({
      length: [12],
      characterTypes: this.#fb.group({
        numbers: [false],
        symbols: [false],
        lowercase: [true],
        uppercase: [false],
      }),
    });
  }

  ngOnInit() {
    this.#passwordSubscription = this.passwordForm.valueChanges.subscribe(
      (values: PasswordOptionsInterface) => {
        this.emitPasswordOptions(values);
      },
    );
  }

  ngOnDestroy(): void {
    this.#passwordSubscription.unsubscribe();
  }

  private emitPasswordOptions(values: PasswordOptionsInterface) {
    const passwordOptions: PasswordOptionsInterface = {
      length: values.length,
      characterTypes: {
        numbers: values.characterTypes.numbers,
        symbols: values.characterTypes.symbols,
        lowercase: values.characterTypes.lowercase,
        uppercase: values.characterTypes.uppercase,
      },
    };

    this.passwordOptions.emit(passwordOptions);
  }
}
