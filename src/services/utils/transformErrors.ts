import { ErrorOption, FieldName } from 'react-hook-form';
// localization
import i18n from 'src/services/localization';

type TransformedError<T> = {
  name: FieldName<T>;
  error: ErrorOption;
};

const transformErrors = <T>(
  errors: Record<string, string>,
): TransformedError<T>[] =>
  (Object.keys(errors) as FieldName<T>[]).map((key) => ({
    name: key,
    error: {
      type: 'manual',
      message: i18n.t(`validation:${errors[key]}`),
    },
  }));

export default transformErrors;
