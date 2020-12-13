import * as yup from 'yup';
// localization
import i18n from 'src/services/localization';

export const schemaValidation = yup.object().shape({
  email: yup
    .string()
    .email(i18n.t('validation:invalidEmail'))
    .required(i18n.t('validation:required')),
});
