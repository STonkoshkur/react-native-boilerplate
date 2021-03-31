import React, { PropsWithChildren, ReactElement } from 'react';
import { Control, Controller, FieldName, FieldValues } from 'react-hook-form';
// components
import ImagePicker, { ImagePickerProps } from 'src/components/Form/ImagePicker';
// entities
import { FileEntity } from 'src/entities/FileEntity';

type ImagePickerAdapterProps = Omit<ImagePickerProps, 'value' | 'onChange'> & {
  onChange?: ImagePickerProps['onChange'];
  control: Control<FieldValues>;
  name: FieldName<FieldValues>;
  defaultValue: FileEntity | null;
};

const ImagePickerAdapter = ({
  control,
  name,
  defaultValue,
  onChange: onChangeFromProps,
  children,
  ...props
}: PropsWithChildren<ImagePickerAdapterProps>): ReactElement => (
  <Controller
    name={name}
    control={control}
    defaultValue={defaultValue}
    render={({ onChange, value }): ReactElement => (
      <ImagePicker
        {...props}
        value={value}
        onChange={(uploadedImage) => {
          onChange(uploadedImage);
          onChangeFromProps?.(uploadedImage);
        }}>
        {children}
      </ImagePicker>
    )}
  />
);

export default ImagePickerAdapter;
