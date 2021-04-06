export default {
  common: {
    welcome: '¡Bienvenido!',
    home: 'Home',
    settings: 'Configuracións',
    email: 'Email',
    password: 'Contraseña',
    signIn: 'Registrarse',
    signUp: 'Regístrate',
    logout: 'Cerrar sesión',
    firstName: 'Nombre de pila',
    lastName: 'Apellido',
    authAgreements:
      'Estoy de acuerdo con los <0>Términos de Condiciones</0> y <1>Política de Privacidad</1>',
    forgotPassword: 'Se te olvidó tu contraseña',
    submit: 'Enviar',
    forgotPasswordSuccessTitle: 'Éxito',
    forgotPasswordSuccessMessage:
      'Revise su correo electrónico para restablecer la contraseña',
    cancel: 'Cancelar',
  },
  errors: {
    serverError: 'Error del Servidor',
    statusCode: 'Código de situación: {{code}}',
  },
  validation: {
    required: 'Se requiere campo',
    minString: 'Debe tener al menos {{value}} caracteres',
    invalidEmail: 'Debe ser un correo electrónico válido',
    emailNotExists: 'Usuario con este correo electrónico no encontrado',
    incorrectPassword: 'Contraseña incorrecta',
    emailAlreadyExists: 'El usuario con este correo electrónico ya existe',
    notFound: 'Extraviado',
  },
  imagePicker: {
    selectImage: 'Seleccionar imagen',
    sourceMessage: 'Seleccionar fuente de imagen',
    chooseFromLibrary: 'Elige de la biblioteca',
    takePhoto: 'Tomar foto',
  },
} as const;
