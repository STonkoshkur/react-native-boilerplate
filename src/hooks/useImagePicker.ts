import { useCallback, useMemo } from 'react';
// import { Alert } from 'react-native';
import ImageCropPicker, {
  Image,
  Video,
  ImageOrVideo,
  Options,
  PossibleArray,
} from 'react-native-image-crop-picker';
// localization
import { useTranslation } from 'react-i18next';

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

export const useImagePicker = <O extends Options>(generalOptions?: O) => {
  const { t } = useTranslation(['common', 'imagePicker']);

  const pickImageBySource = useCallback(
    async (sourceMethod: 'openPicker' | 'openCamera', options?: O) => {
      return ImageCropPicker[sourceMethod]({
        // TODO: move default values to const
        width: 512,
        height: 512,
        cropping: true,
        mediaType: 'photo',
        forceJpg: true,
        ...generalOptions,
        ...options,
      }) as Promise<PossibleArray<O, MediaType<O>>>;
    },
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
    async ({
      // title,
      // subtitle,
      pickerOptions,
    }: SelectImageSourceParams<O> = {}) => {
      // return new Promise((resolve, reject) =>
      //   Alert.alert(
      //     title ?? t('imagePicker:selectImage'),
      //     subtitle ?? t('imagePicker:sourceMessage'),
      //     [
      //       {
      //         text: t('cancel'),
      //         style: 'cancel',
      //         onPress: () => reject('File selection canceled'),
      //       },
      //       {
      //         text: t('imagePicker:chooseFromLibrary'),
      //         onPress: async () => {
      //           const files = await pickImageFromLibrary(pickerOptions);

      //           resolve(files);
      //         },
      //       },
      //       {
      //         text: t('imagePicker:takePhoto'),
      //         // onPress: () => resolve(pickImageFromCamera(pickerOptions)),
      //         onPress: async () => {
      //           const files = await pickImageFromCamera(pickerOptions);

      //           resolve(files);
      //         },
      //       },
      //     ],
      //   ),
      // );

      // TODO: add selection modal
      return await pickImageFromLibrary(pickerOptions);
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
