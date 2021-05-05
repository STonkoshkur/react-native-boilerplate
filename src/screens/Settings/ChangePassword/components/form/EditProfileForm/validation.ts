import * as yup from 'yup';
// localization
import i18n from 'src/services/localization';

export const schemaValidation = yup
  .object()
  .shape({
    oldPassword: yup
      .string()
      .required(i18n.t('validation:required'))
      .min(
        6,
        i18n.t('validation:minString', {
          value: 6,
        }),
      ),
    password: yup
      .string()
      .required(i18n.t('validation:required'))
      .min(
        6,
        i18n.t('validation:minString', {
          value: 6,
        }),
      ),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref('password')], i18n.t('validation:passwordMatch'))
      .required(i18n.t('validation:required'))
      .min(
        6,
        i18n.t('validation:minString', {
          value: 6,
        }),
      ),
  })
  .defined();
