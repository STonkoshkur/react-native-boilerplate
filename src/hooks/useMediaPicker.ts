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
export type SelectMediaSourceParams<O extends Options = Options> = {
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

export const useMediaPicker = <O extends Options>(generalOptions?: O) => {
  const { t } = useTranslation(['common', 'imagePicker']);

  const pickMediaBySource = useCallback(
    (sourceMethod: 'openPicker' | 'openCamera', options?: O) =>
      ImageCropPicker[sourceMethod]({
        // TODO: move default values to const
        width: 1024,
        height: 1024,
        cropping: true as boolean,
        mediaType: 'photo',
        forceJpg: true as boolean,
        compressImageQuality: 0.8,
        ...generalOptions,
        ...options,
      }) as Promise<PossibleArray<O, MediaType<O>>>,
    [generalOptions],
  );

  const pickMediaFromCamera = useCallback(
    (options?: O) => pickMediaBySource('openCamera', options),
    [pickMediaBySource],
  );

  const pickMediaFromLibrary = useCallback(
    (options?: O) => pickMediaBySource('openPicker', options),
    [pickMediaBySource],
  );

  const selectMediaSource = useCallback(
    ({ title, subtitle, pickerOptions }: SelectMediaSourceParams<O> = {}) => {
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
              onPress: () => resolve(pickMediaFromLibrary(pickerOptions)),
            },
            {
              text: t('imagePicker:takePhoto'),
              onPress: () => resolve(pickMediaFromCamera(pickerOptions)),
            },
          ],
        ),
      );
    },
    [pickMediaFromCamera, pickMediaFromLibrary, t],
  );

  return useMemo(
    () => ({
      selectMediaSource,
      pickMediaFromCamera,
      pickMediaFromLibrary,
    }),
    [selectMediaSource, pickMediaFromCamera, pickMediaFromLibrary],
  );
};
