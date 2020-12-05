export default {
  common: {
    welcome: '¡Bienvenido!',
    home: 'Home',
    settings: 'Configuracións',
    email: 'Email',
    password: 'Contraseña',
    signIn: 'Registrarse',
    signUp: 'Regístrate',
    firstName: 'Nombre de pila',
    lastName: 'Apellido',
  },
  errors: {
    serverError: 'Error del Servidor',
    statusCode: 'Código de situación: {{code}}',
  },
  validation: {
    required: 'Se requiere campo',
    min: 'Debe tener al menos {{value}} caracteres',
    invalidEmail: 'Debe ser un correo electrónico válido',
    emailNotExists: 'Usuario con este correo electrónico no encontrado',
    incorrectPassword: 'Contraseña incorrecta',
    emailAlreadyExists: 'El usuario con este correo electrónico ya existe',
  },
} as const;
