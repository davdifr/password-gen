import { TestBed } from '@angular/core/testing';
import { PasswordService } from './password.service';
import { PasswordOptionsInterface } from '../types/password-options.interface';

describe('PasswordService', () => {
  let service: PasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw an error if no character types are selected', () => {
    const options: PasswordOptionsInterface = {
      length: 10,
      characterTypes: {
        numbers: false,
        symbols: false,
        lowercase: false,
        uppercase: false,
      },
    };
    expect(() => service.generatePassword(options)).toThrowError(
      'At least one character type should be selected',
    );
  });

  it('should throw an error if length is less than or equal to 0', () => {
    const options: PasswordOptionsInterface = {
      length: 0,
      characterTypes: {
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
      },
    };
    expect(() => service.generatePassword(options)).toThrowError(
      'Length should be a positive integer',
    );
  });

  it('should generate a password of the correct length', () => {
    const options: PasswordOptionsInterface = {
      length: 12,
      characterTypes: {
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
      },
    };
    const password = service.generatePassword(options);
    expect(password.length).toBe(12);
  });

  it('should include at least one number if numbers are selected', () => {
    const options: PasswordOptionsInterface = {
      length: 10,
      characterTypes: {
        numbers: true,
        symbols: false,
        lowercase: false,
        uppercase: false,
      },
    };
    const password = service.generatePassword(options);
    expect(password).toMatch(/[0-9]/);
  });

  it('should include at least one symbol if symbols are selected', () => {
    const options: PasswordOptionsInterface = {
      length: 10,
      characterTypes: {
        numbers: false,
        symbols: true,
        lowercase: false,
        uppercase: false,
      },
    };
    const password = service.generatePassword(options);
    expect(password).toMatch(/[!@#$%^&*()_+\-=[\]{}|;:,.<>?]/);
  });

  it('should include at least one lowercase letter if lowercase is selected', () => {
    const options: PasswordOptionsInterface = {
      length: 10,
      characterTypes: {
        numbers: false,
        symbols: false,
        lowercase: true,
        uppercase: false,
      },
    };
    const password = service.generatePassword(options);
    expect(password).toMatch(/[a-z]/);
  });

  it('should include at least one uppercase letter if uppercase is selected', () => {
    const options: PasswordOptionsInterface = {
      length: 10,
      characterTypes: {
        numbers: false,
        symbols: false,
        lowercase: false,
        uppercase: true,
      },
    };
    const password = service.generatePassword(options);
    expect(password).toMatch(/[A-Z]/);
  });

  it('should shuffle the password before returning', () => {
    const options: PasswordOptionsInterface = {
      length: 10,
      characterTypes: {
        numbers: true,
        symbols: true,
        lowercase: true,
        uppercase: true,
      },
    };
    const password = service.generatePassword(options);
    const shuffledPassword = service['shuffleArray'](password.split('')).join(
      '',
    );
    expect(password).not.toEqual(shuffledPassword);
  });
});
