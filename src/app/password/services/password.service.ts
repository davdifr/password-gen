import { Injectable } from '@angular/core';
import { CharacterType } from '../types/character-type.enum';
import { PasswordOptionsInterface } from '../types/password-options.interface';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  #characterSets: { [key in CharacterType]: string[] } = {
    [CharacterType.NUMBERS]: '0123456789'.split(''),
    [CharacterType.SYMBOLS]: '!@#$%^&*()_+-=[]{}|;:,.<>?'.split(''),
    [CharacterType.LOWERCASE]: 'abcdefghijklmnopqrstuvwxyz'.split(''),
    [CharacterType.UPPERCASE]: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  };

  /**
   * Generates a random password based on selected character types and length.
   * @param length - Length of the password to generate.
   * @param useNumbers - Include numbers in the password.
   * @param useSymbols - Include symbols in the password.
   * @param useLowercase - Include lowercase letters in the password.
   * @param useUppercase - Include uppercase letters in the password.
   * @returns A randomly generated password.
   */
  generatePassword(options: PasswordOptionsInterface): string {
    const { length, characterTypes } = options;
    const { numbers, symbols, lowercase, uppercase } = characterTypes;

    if (!numbers && !symbols && !lowercase && !uppercase) {
      throw new Error('At least one character type should be selected');
    }

    if (length <= 0) {
      throw new Error('Length should be a positive integer');
    }

    const selectedTypes: CharacterType[] = [];
    if (numbers) selectedTypes.push(CharacterType.NUMBERS);
    if (symbols) selectedTypes.push(CharacterType.SYMBOLS);
    if (lowercase) selectedTypes.push(CharacterType.LOWERCASE);
    if (uppercase) selectedTypes.push(CharacterType.UPPERCASE);

    // Collect all selected character sets into a single array
    const characters: string[] = selectedTypes.flatMap(
      (type) => this.#characterSets[type],
    );

    // Ensure at least one character from each selected type is included
    const password: string[] = selectedTypes.map((type) => {
      const charSet = this.#characterSets[type];
      return this.getRandomCharacter(charSet);
    });

    // Generate the remaining characters
    const remainingCharacters = Array.from(
      { length: length - password.length },
      () => this.getRandomCharacter(characters),
    );

    password.push(...remainingCharacters);

    // Shuffle the password array before returning
    return this.shuffleArray(password).join('');
  }

  /**
   * Helper function to get a random character from a character set.
   * @param charSet - Array of characters to choose from.
   * @returns A random character from the set.
   */
  private getRandomCharacter(charSet: string[]): string {
    return charSet[Math.floor(Math.random() * charSet.length)];
  }

  /**
   * Helper function to shuffle an array.
   * @param array - The array to shuffle.
   * @returns The shuffled array.
   */
  private shuffleArray(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
  }
}
