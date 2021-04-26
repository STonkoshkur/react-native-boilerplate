import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller, Path } from 'react-hook-form';
// components
import Input, { InputProps } from 'src/components/Form/Input';

type InputAdapterProps<T> = InputProps & {
  control: Control<T>;
  name: Path<T>;
  defaultValue: string;
};

function InputAdapter<T>({
  control,
  name,
  defaultValue,
  ...props
}: PropsWithChildren<InputAdapterProps<T>>): ReactElement {
  return (
    <Controller
      control={control}
      render={({ field: { onChange, onBlur, value } }): ReactElement => {
        return (
          <Input
            {...props}
            onBlur={onBlur}
            onChangeText={(textValue): void => onChange(textValue)}
            value={value as string}
          />
        );
      }}
      name={name}
      defaultValue={defaultValue}
    />
  );
}

export default InputAdapter;
