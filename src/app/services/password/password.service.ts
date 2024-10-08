import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  #numbers = '0123456789';
  #symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  #lowercase = 'abcdefghijklmnopqrstuvwxyz';
  #uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  generatePassword(
    length: number = 8,
    useNumbers: boolean,
    useSymbols: boolean,
    useLowercase: boolean,
    useUppercase: boolean
  ) {
    if (!useNumbers && !useSymbols && !useLowercase && !useUppercase) {
      throw new Error('At least one character type should be selected');
    }

    if (length <= 0) {
      throw new Error('Length should be a positive integer');
    }

    let characters = '';
    let password = '';

    if (useNumbers) {
      characters += this.#numbers;
      password +=
        this.#numbers[Math.floor(Math.random() * this.#numbers.length)];
    }
    if (useSymbols) {
      characters += this.#symbols;
      password +=
        this.#symbols[Math.floor(Math.random() * this.#symbols.length)];
    }
    if (useLowercase) {
      characters += this.#lowercase;
      password +=
        this.#lowercase[Math.floor(Math.random() * this.#lowercase.length)];
    }
    if (useUppercase) {
      characters += this.#uppercase;
      password +=
        this.#uppercase[Math.floor(Math.random() * this.#uppercase.length)];
    }

    // Generate the rest of the password
    password += Array.from(
      { length: length - password.length },
      () => characters[Math.floor(Math.random() * characters.length)]
    ).join('');

    // Reshuffle the password
    password = password
      .split('')
      .sort(() => Math.random() - 0.5)
      .join('');

    return password;
  }
}
