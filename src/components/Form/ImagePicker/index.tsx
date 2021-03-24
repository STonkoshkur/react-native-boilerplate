import { FC, ReactElement, useCallback } from 'react';
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
};

export type PickerValue<O> = O extends { multiple: true }
  ? PickerFileEntity[]
  : PickerFileEntity;

type ChildrenProps<O> = {
  value: PickerValue<O> | null;
  pickMediaFiles: () => void;
  deleteImage: (path: string) => void;
};

export type ImagePickerProps<O = Options> = {
  options?: O;
  value: PickerValue<O> | null;
  onChange: (value: PickerValue<O> | null) => void;
  children: (childrenProps: ChildrenProps<O>) => ReactElement;
};

const ImagePicker: FC<ImagePickerProps> = ({
  value = null,
  onChange,
  options,
  children,
}) => {
  const { selectImageSource } = useImagePicker(options);
  const { uploadImage } = useFileUpload();

  const pickMediaFiles = useCallback(
    async (pickerOptions?: SelectImageSourceParams) => {
      const isMultiselect = options?.multiple ?? false;

      try {
        const selectedMedia = await selectImageSource(pickerOptions);

        if (selectedMedia !== undefined) {
          console.log('ImagePicker selectedMedia', selectedMedia);

          const serializedSelectedFiles: PickerFileEntity[] = (Array.isArray(
            selectedMedia,
          )
            ? (selectedMedia as (Image | Video | ImageOrVideo)[])
            : [selectedMedia]
          ).map(file => ({ ...file, path: file.path, isLoading: true }));

          const valueToUpdate = isMultiselect
            ? Array.isArray(value)
              ? [...(value as PickerFileEntity[]), ...serializedSelectedFiles]
              : [...serializedSelectedFiles]
            : serializedSelectedFiles;

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore types problems
          onChange(isMultiselect ? valueToUpdate : valueToUpdate[0]);

          await Promise.all(
            serializedSelectedFiles.map(async file => {
              try {
                // TODO: fix
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore types problems
                const uploadedFile = await uploadImage(file);

                valueToUpdate.forEach(currentNewValueFile => {
                  if (currentNewValueFile.path === file.path) {
                    currentNewValueFile.id = uploadedFile.id;
                    currentNewValueFile.isLoading = false;
                    currentNewValueFile.error = undefined;
                  }
                });

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore types problems
                onChange(isMultiselect ? valueToUpdate : valueToUpdate[0]);
              } catch (e) {
                let error = 'Unknown file uploading error';

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

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore types problems
                onChange(isMultiselect ? valueToUpdate : valueToUpdate[0]);
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore types problems
        onChange(value.filter(item => item.path !== pathToDelete));
      } else if (!options?.multiple && value?.path === pathToDelete) {
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
};

export type { Image, Video, ImageOrVideo, Options };

export default ImagePicker;
