import { TestBed } from '@angular/core/testing';
import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PasswordService],
    });
    passwordService = TestBed.inject(PasswordService);
  });

  it('should generate a password with at least one character type selected', () => {
    expect(() =>
      passwordService.generatePassword(8, false, false, false, false)
    ).toThrowError('At least one character type should be selected');
  });

  it('should generate a password with a positive length', () => {
    expect(() =>
      passwordService.generatePassword(0, true, true, true, true)
    ).toThrowError('Length should be a positive integer');
  });

  it('should generate a password with the specified length', () => {
    const password = passwordService.generatePassword(
      10,
      true,
      true,
      true,
      true
    );
    expect(password.length).toBe(10);
  });
});
