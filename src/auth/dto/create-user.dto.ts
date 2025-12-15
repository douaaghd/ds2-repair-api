export class CreateUserDto {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly role?: 'ADMIN' | 'TECH'; // optionnel, par défaut TECH
}
