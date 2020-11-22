// services
import axios from 'src/services/api/axios';
// dtos
import {
  AuthEmailSignInDto,
  AuthSession,
  AuthSocialSignInDto,
  AuthRegistrationDto,
  AuthForgotPasswordDto,
} from 'src/dtos/Auth';
// entities
import { User } from 'src/entities/User';

export default {
  signUp: (data: AuthRegistrationDto): Promise<void> =>
    axios.post('auth/register/email', data),
  signIn: (data: AuthEmailSignInDto): Promise<AuthSession> =>
    axios.post('auth/login/email', data),
  socialSignIn: (data: AuthSocialSignInDto): Promise<AuthSession> =>
    axios.post('auth/login/social', data),
  forgotPassword: (data: AuthForgotPasswordDto): Promise<void> =>
    axios.post('auth/forgot/password', data),
  getProfile: (): Promise<User> => axios.get('/auth/me'),
  update: (data: Partial<User>): Promise<User> => axios.patch('/auth/me', data),
  delete: (): Promise<void> => axios.delete('/auth/me'),
};
