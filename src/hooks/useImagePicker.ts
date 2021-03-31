import { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
import ImageCropPicker, {
  Image,
  Video,
  ImageOrVideo,
  Options,
  PossibleArray,
} from 'react-native-image-crop-picker';
// localization
import { useTranslation } from 'react-i18next';

// types
export type SelectImageSourceParams<O extends Options = Options> = {
  title?: string;
  subtitle?: string;
  pickerOptions?: O;
};

export type MediaType<O> = O extends { mediaType: 'photo' }
  ? Image
  : O extends { mediaType: 'video' }
  ? Video
  : ImageOrVideo;

export type { Image, Video, ImageOrVideo, Options, PossibleArray };

export const useImagePicker = <O extends Options>(generalOptions?: O) => {
  const { t } = useTranslation(['common', 'imagePicker']);

  const pickImageBySource = useCallback(
    (sourceMethod: 'openPicker' | 'openCamera', options?: O) =>
      ImageCropPicker[sourceMethod]({
        // TODO: move default values to const
        width: 1024,
        height: 1024,
        cropping: true,
        mediaType: 'photo',
        forceJpg: true,
        compressImageQuality: 0.8,
        ...generalOptions,
        ...options,
      }) as Promise<PossibleArray<O, MediaType<O>>>,
    [generalOptions],
  );

  const pickImageFromCamera = useCallback(
    (options?: O) => pickImageBySource('openCamera', options),
    [pickImageBySource],
  );

  const pickImageFromLibrary = useCallback(
    (options?: O) => pickImageBySource('openPicker', options),
    [pickImageBySource],
  );

  const selectImageSource = useCallback(
    ({ title, subtitle, pickerOptions }: SelectImageSourceParams<O> = {}) => {
      return new Promise<PossibleArray<O, MediaType<O>>>((resolve, reject) =>
        Alert.alert(
          title ?? t('imagePicker:selectImage'),
          subtitle ?? t('imagePicker:sourceMessage'),
          [
            {
              text: t('cancel'),
              style: 'cancel',
              onPress: () => reject('File selection canceled'),
            },
            {
              text: t('imagePicker:chooseFromLibrary'),
              onPress: () => resolve(pickImageFromLibrary(pickerOptions)),
            },
            {
              text: t('imagePicker:takePhoto'),
              onPress: () => resolve(pickImageFromCamera(pickerOptions)),
            },
          ],
        ),
      );
    },
    [pickImageFromCamera, pickImageFromLibrary, t],
  );

  return useMemo(
    () => ({
      selectImageSource,
      pickImageFromCamera,
      pickImageFromLibrary,
    }),
    [selectImageSource, pickImageFromCamera, pickImageFromLibrary],
  );
};
