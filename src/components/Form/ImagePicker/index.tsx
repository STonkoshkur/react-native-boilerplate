import { ReactElement, useCallback } from 'react';
// components
import {
  Options,
  Image,
  Video,
  ImageOrVideo,
} from 'react-native-image-crop-picker';
// utils
import { useFileUpload } from 'src/hooks/useFileUpload';
import {
  useImagePicker,
  SelectImageSourceParams,
} from 'src/hooks/useImagePicker';

export type PickerFileEntity = {
  id?: string;
  path: string;
  isLoading?: boolean;
  error?: string;
  mime?: string;
  size?: number;
};

type ChildrenProps = {
  value: PickerFileEntity | PickerFileEntity[] | null;
  pickMediaFiles: () => void;
  deleteImage: (path: string) => void;
};

export type ImagePickerProps = {
  options: Options;
  value: PickerFileEntity | PickerFileEntity[] | null;
  onChange: (value: PickerFileEntity | PickerFileEntity[] | null) => void;
  children: (childrenProps: ChildrenProps) => ReactElement;
};

function ImagePicker({
  value = null,
  onChange,
  options,
  children,
}: ImagePickerProps) {
  const { selectImageSource } = useImagePicker(options);
  const { uploadImage } = useFileUpload();

  const pickMediaFiles = useCallback(
    async (pickerOptions?: SelectImageSourceParams) => {
      const isMultiSelect =
        pickerOptions?.pickerOptions?.multiple ?? options?.multiple ?? false;

      try {
        const selectedMedia = await selectImageSource(pickerOptions);

        if (selectedMedia !== undefined) {
          console.log('ImagePicker selectedMedia', selectedMedia);

          const serializedSelectedFiles = (Array.isArray(selectedMedia)
            ? (selectedMedia as (Image | Video | ImageOrVideo)[])
            : [selectedMedia]
          ).map(
            file =>
              ({
                ...file,
                path: file.path,
                isLoading: true,
              } as PickerFileEntity),
          );

          const valueToUpdate =
            isMultiSelect && Array.isArray(value)
              ? [...value, ...serializedSelectedFiles]
              : serializedSelectedFiles;

          onChange(isMultiSelect ? valueToUpdate : valueToUpdate[0]);

          await Promise.all(
            serializedSelectedFiles.map(async file => {
              try {
                const uploadedFile = await uploadImage(file);

                valueToUpdate.forEach(currentNewValueFile => {
                  if (currentNewValueFile.path === file.path) {
                    currentNewValueFile.id = uploadedFile.id;
                    currentNewValueFile.isLoading = false;
                    currentNewValueFile.error = undefined;
                  }
                });

                onChange(isMultiSelect ? valueToUpdate : valueToUpdate[0]);
              } catch (e) {
                let error = e.toString();

                if (e.status === 422) {
                  error =
                    e.data?.errors?.file ?? 'Unknown file validation error';
                }

                valueToUpdate.forEach(currentNewValueFile => {
                  if (currentNewValueFile.path === file.path) {
                    currentNewValueFile.isLoading = false;
                    currentNewValueFile.error = error;
                  }
                });

                onChange(isMultiSelect ? valueToUpdate : valueToUpdate[0]);
              }
            }),
          );
        }
      } catch (e) {
        console.error(e, 'ImageCropPicker pickMediaFiles error');
      }
    },
    [options?.multiple, value, onChange, uploadImage, selectImageSource],
  );

  const deleteImage = useCallback(
    (pathToDelete: string) => () => {
      if (options?.multiple && Array.isArray(value)) {
        onChange(value.filter(item => item.path !== pathToDelete));
      } else {
        onChange(null);
      }
    },
    [onChange, value, options?.multiple],
  );

  return children({
    value,
    pickMediaFiles,
    deleteImage,
  });
}

export type { Image, Video, ImageOrVideo, Options };

export default ImagePicker;
