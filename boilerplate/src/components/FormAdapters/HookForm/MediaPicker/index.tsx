import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller, FieldName, FieldValues } from 'react-hook-form';
// components
import MediaPicker, { MediaPickerProps } from 'src/components/Form/MediaPicker';
// entities
import { FileEntity } from 'src/entities/FileEntity';

type MediaPickerAdapterProps = Omit<MediaPickerProps, 'value' | 'onChange'> & {
  onChange?: MediaPickerProps['onChange'];
  control: Control<FieldValues>;
  name: FieldName<FieldValues>;
  defaultValue: FileEntity | null;
};

const MediaPickerAdapter = ({
  control,
  name,
  defaultValue,
  onChange: onChangeFromProps,
  children,
  ...props
}: PropsWithChildren<MediaPickerAdapterProps>): ReactElement => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ onChange, value }): ReactElement => (
      <MediaPicker
        {...props}
        value={value}
        onChange={(uploadedImage) => {
          onChange(uploadedImage);
          onChangeFromProps?.(uploadedImage);
        }}>
        {children}
      </MediaPicker>
    )}
  />
);

export default MediaPickerAdapter;
