import React, { PropsWithChildren, ReactElement } from 'react';
import { PathValue } from 'react-hook-form';
import { Control, Controller, Path, UnpackNestedValue } from 'react-hook-form';
// components
import Input, { InputProps } from 'src/components/Form/Input';

type InputAdapterProps<T> = InputProps & {
  control: Control<T>;
  name: Path<T>;
  defaultValue: UnpackNestedValue<PathValue<T, Path<T>>> | undefined;
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
