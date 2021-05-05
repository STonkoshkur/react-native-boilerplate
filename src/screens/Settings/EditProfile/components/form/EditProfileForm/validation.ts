import * as yup from 'yup';
// localization
import i18n from 'src/services/localization';

export const validationSchema = yup
  .object()
  .shape({
    photo: yup
      .object({
        id: yup.string().required(i18n.t('validation:required')),
        path: yup.string().required(i18n.t('validation:required')),
      })
      .defined()
      .nullable(),
    firstName: yup.string().required(i18n.t('validation:required')),
    lastName: yup.string().required(i18n.t('validation:required')),
  })
  .defined();
