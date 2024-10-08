export interface PasswordOptionsInterface {
  length: number;
  characterTypes: {
    numbers: boolean;
    symbols: boolean;
    lowercase: boolean;
    uppercase: boolean;
  };
}
