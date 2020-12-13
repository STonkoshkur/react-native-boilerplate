export default {
  common: {
    welcome: 'Welcome!',
    home: 'Home',
    settings: 'Settings',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    logout: 'Logout',
    firstName: 'First name',
    lastName: 'Last name',
    authAgreements:
      'I agree with the <0>Terms of Conditions</0> and <1>Privacy Policy</1>',
  },
  errors: {
    serverError: 'Server Error',
    statusCode: 'Status code: {{code}}',
  },
  validation: {
    required: 'Field is required',
    minString: 'Must be at least {{value}} characters',
    invalidEmail: 'Must be a valid email',
    emailNotExists: 'User with this email not found',
    incorrectPassword: 'Wrong password',
    emailAlreadyExists: 'User with this email already exists',
  },
} as const;
