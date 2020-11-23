// enums
import { SocialEnum } from 'src/enums/SocialEnum';
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

export type AuthSocialSignInDto = {
  tokens: {
    token1: Token;
    token2?: Token;
  };
  socialType: SocialEnum;
  firstName?: User['firstName'] | null;
  lastName?: User['lastName'] | null;
};

export type AuthForgotPasswordDto = {
  email: string;
};

export type AuthRessetPasswordDto = {
  password: string;
  hash: string;
};
