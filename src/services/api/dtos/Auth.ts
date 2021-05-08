// entities
import { User } from 'src/entities/User';

export type Token = string | null;

export type AuthSession = {
  token: Token | null;
  user: User;
};

export type AuthRegistrationDto = Pick<User, 'firstName' | 'lastName'> & {
  email: string;
  password: string;
};

export type AuthEmailSignInDto = {
  email: string;
  password: string;
};

export type AuthAppleSignInDto = {
  idToken: Token;
  firstName?: User['firstName'] | null;
  lastName?: User['lastName'] | null;
};

export type AuthFacebookSignInDto = {
  accessToken: Token;
};

export type AuthGoogleSignInDto = {
  idToken: Token;
};

export type AuthForgotPasswordDto = {
  email: string;
};

export type AuthRessetPasswordDto = {
  password: string;
  hash: string;
};

export type ProfileUpdateDto = Pick<User, 'firstName' | 'lastName' | 'photo'>;

export type ProfileUpdatePasswordDto = {
  oldPassword: string;
  password: string;
  passwordConfirmation?: string;
};
