import React, { PropsWithChildren } from 'react';
import { Control, Controller, FieldName } from 'react-hook-form';
// components
import Input, { InputProps } from 'src/components/Form/Input';

type InputAdapterProps<T> = InputProps & {
  control: Control<T>;
  name: FieldName<T>;
  defaultValue: unknown;
};

const InputAdapter = <T extends {} = {}>({
  control,
  name,
  defaultValue,
  ...props
}: PropsWithChildren<InputAdapterProps<T>>): JSX.Element => {
  return (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }): JSX.Element => (
        <Input
          {...props}
          onBlur={onBlur}
          onChangeText={(textValue): void => onChange(textValue)}
          value={value}
        />
      )}
      name={name}
      defaultValue={defaultValue}
    />
  );
};

export default InputAdapter;
