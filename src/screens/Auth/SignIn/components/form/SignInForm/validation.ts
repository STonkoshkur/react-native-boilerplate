import * as yup from 'yup';
// localization
import i18n from 'src/services/localization';

export const schemaValidation = yup
  .object({
    email: yup
      .string()
      .email(i18n.t('validation:invalidEmail'))
      .required(i18n.t('validation:required')),
    password: yup
      .string()
      .required(i18n.t('validation:required'))
      .min(
        6,
        i18n.t('validation:minString', {
          value: 6,
        }),
      ),
  })
  .required();
