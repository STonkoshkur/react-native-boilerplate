import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller, FieldName, FieldValues } from 'react-hook-form';
// components
import Input, { InputProps } from 'src/components/Form/Input';

type InputAdapterProps = InputProps & {
  control: Control<FieldValues>;
  name: FieldName<FieldValues>;
  defaultValue: unknown;
};

const InputAdapter = ({
  control,
  name,
  defaultValue,
  ...props
}: PropsWithChildren<InputAdapterProps>): ReactElement => {
  return (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }): ReactElement => (
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
