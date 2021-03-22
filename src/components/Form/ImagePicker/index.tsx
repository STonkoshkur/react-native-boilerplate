import { FC, ReactElement, useCallback } from 'react';
// components
import {
  Options,
  Image,
  Video,
  ImageOrVideo,
} from 'react-native-image-crop-picker';
// entities
import { FileEntity } from 'src/entities/FileEntity';
// utils
import { useFileUpload } from 'src/hooks/useFileUpload';
import {
  useImagePicker,
  SelectImageSourceParams,
} from 'src/hooks/useImagePicker';

export type { Image };
export type LocalMediaType<O> = O extends { mediaType: 'photo' }
  ? Image
  : O extends { mediaType: 'video' }
  ? Video
  : ImageOrVideo;

export type PickerValue<T, O> = T extends true ? FileEntity : LocalMediaType<O>;

type ChildrenProps<T, O> = {
  isUploading: boolean;
  value: PickerValue<T, O> | null;
  pickMediaFiles: () => void;
};

export type ImagePickerProps<U = boolean, O = Options> = {
  uploadToServer?: U;
  options?: O;
  value?: PickerValue<U, O> | null;
  onSelect?: (value: PickerValue<U, O> | null) => void;
  onError?: (error: unknown) => void;
  children: (childrenProps: ChildrenProps<U, O>) => ReactElement;
};

const ImagePicker: FC<ImagePickerProps> = ({
  value = null,
  onSelect,
  onError,
  options,
  uploadToServer,
  children,
}) => {
  const { selectImageSource } = useImagePicker(options);
  const { isUploading, uploadImage } = useFileUpload();

  const pickMediaFiles = useCallback(
    async (pickerOptions?: SelectImageSourceParams) => {
      try {
        const selectedMedia = await selectImageSource(pickerOptions);

        // TODO: add multiselected image uploading
        const fileToUpload =
          options?.multiple && Array.isArray(selectedMedia)
            ? selectedMedia[0]
            : selectedMedia;

        onSelect?.(selectedMedia);

        if (uploadToServer) {
          const uploadedFile = await uploadImage(fileToUpload);

          onSelect?.(uploadedFile);
        }
      } catch (e) {
        console.error(e, 'ImageCropPicker pickMediaFiles error');
        onError?.(e);
      }
    },
    [
      options?.multiple,
      onSelect,
      onError,
      uploadToServer,
      uploadImage,
      selectImageSource,
    ],
  );

  return children({
    value,
    isUploading,
    pickMediaFiles,
  });
};

export default ImagePicker;
