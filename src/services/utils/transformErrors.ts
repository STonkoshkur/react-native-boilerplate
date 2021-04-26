import { ErrorOption, Path } from 'react-hook-form';
// localization
import i18n from 'src/services/localization';

type TransformedError<T> = {
  name: Path<T>;
  error: ErrorOption;
};

const transformErrors = <T>(
  errors: Record<string, string>,
): TransformedError<T>[] =>
  (Object.keys(errors) as Path<T>[]).map((key) => ({
    name: key,
    error: {
      type: 'manual',
      message: i18n.t(`validation:${errors[key]}`),
    },
  }));

export default transformErrors;
