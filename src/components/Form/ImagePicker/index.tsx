import { ReactElement, useCallback } from 'react';
// utils
import { useFileUpload } from 'src/hooks/useFileUpload';
import {
  useImagePicker,
  SelectImageSourceParams,
  Options,
  ImageOrVideo,
  Video,
  Image,
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
    async (config?: SelectImageSourceParams) => {
      const isMultiSelect =
        config?.pickerOptions?.multiple ?? options?.multiple ?? false;

      try {
        const selectedMedia = await selectImageSource(config);

        if (selectedMedia !== undefined) {
          const serializedSelectedFiles = (Array.isArray(selectedMedia)
            ? (selectedMedia as (Image | Video | ImageOrVideo)[])
            : [selectedMedia]
          ).map(
            (file) =>
              ({
                ...file,
                path: file.path ?? file.sourceURL,
                isLoading: true,
              } as PickerFileEntity),
          );

          const valueToUpdate =
            isMultiSelect && Array.isArray(value)
              ? [...value, ...serializedSelectedFiles]
              : serializedSelectedFiles;

          onChange(isMultiSelect ? valueToUpdate : valueToUpdate[0]);

          await Promise.all(
            serializedSelectedFiles.map(async (file) => {
              try {
                const uploadedFile = await uploadImage(file);

                valueToUpdate.forEach((currentNewValueFile) => {
                  if (currentNewValueFile.path === file.path) {
                    currentNewValueFile.id = uploadedFile.id;
                    currentNewValueFile.isLoading = false;
                    currentNewValueFile.error = undefined;
                  }
                });

                onChange(isMultiSelect ? valueToUpdate : valueToUpdate[0]);
              } catch (e) {
                let error = e.data?.message ?? e.toString();

                if (e.status === 422) {
                  error =
                    e.data?.errors?.file ?? 'Unknown file validation error';
                }

                valueToUpdate.forEach((currentNewValueFile) => {
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
        onChange(value.filter((item) => item.path !== pathToDelete));
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

export default ImagePicker;
