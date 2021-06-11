import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller, Path, PathValue } from 'react-hook-form';
// components
import MediaPicker, { MediaPickerProps } from 'src/components/Form/MediaPicker';

type MediaPickerAdapterProps<T> = Omit<
  MediaPickerProps,
  'value' | 'onChange'
> & {
  onChange?: MediaPickerProps['onChange'];
  control: Control<T>;
  name: Path<T>;
  defaultValue: PathValue<T, Path<T>>;
};

function MediaPickerAdapter<T>({
  control,
  name,
  defaultValue,
  onChange: onChangeFromProps,
  children,
  ...props
}: PropsWithChildren<MediaPickerAdapterProps<T>>): ReactElement {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }): ReactElement => (
        <MediaPicker
          {...props}
          value={value as MediaPickerProps['value']}
          onChange={(uploadedImage) => {
            onChange(uploadedImage);
            onChangeFromProps?.(uploadedImage);
          }}>
          {children}
        </MediaPicker>
      )}
    />
  );
}

export default MediaPickerAdapter;
