// services
import axios from 'src/services/api/axios';
// dtos
import {
  AuthEmailSignInDto,
  AuthSession,
  AuthRegistrationDto,
  AuthForgotPasswordDto,
  ProfileUpdateDto,
  ProfileUpdatePasswordDto,
  AuthFacebookSignInDto,
  AuthAppleSignInDto,
  AuthGoogleSignInDto,
} from 'src/services/api/dtos/Auth';
// entities
import { User } from 'src/entities/User';

export default {
  signUp: (data: AuthRegistrationDto): Promise<void> =>
    axios.post('auth/email/register', data),
  signIn: (data: AuthEmailSignInDto): Promise<AuthSession> =>
    axios.post('auth/email/login', data),
  appleSignIn: (data: AuthAppleSignInDto): Promise<AuthSession> =>
    axios.post('auth/apple/login', data),
  facebookSignIn: (data: AuthFacebookSignInDto): Promise<AuthSession> =>
    axios.post('auth/facebook/login', data),
  googleSignIn: (data: AuthGoogleSignInDto): Promise<AuthSession> =>
    axios.post('auth/google/login', data),
  forgotPassword: (data: AuthForgotPasswordDto): Promise<void> =>
    axios.post('auth/forgot/password', data),
  getProfile: (): Promise<User> => axios.get('/auth/me'),
  updateProfile: (
    data: ProfileUpdateDto | ProfileUpdatePasswordDto,
  ): Promise<User> => axios.patch('/auth/me', data),
  delete: (): Promise<void> => axios.delete('/auth/me'),
};
