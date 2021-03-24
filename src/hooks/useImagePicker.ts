import { useCallback, useMemo } from 'react';
// import { Alert } from 'react-native';
import ImageCropPicker, {
  Options as PickerOptions,
} from 'react-native-image-crop-picker';
// localization
import { useTranslation } from 'react-i18next';

export type SelectImageSourceParams = {
  title?: string;
  subtitle?: string;
  pickerOptions?: PickerOptions;
};

export const useImagePicker = (generalOptions: PickerOptions = {}) => {
  const { t } = useTranslation(['common', 'imagePicker']);

  const pickImageBySource = useCallback(
    async (
      sourceMethod: 'openPicker' | 'openCamera',
      options: PickerOptions = {},
    ) => {
      try {
        return await ImageCropPicker[sourceMethod]({
          // TODO: move default values to const
          width: 512,
          height: 512,
          cropping: true,
          mediaType: 'photo',
          forceJpg: true,
          ...generalOptions,
          ...options,
        });
      } catch {}
    },
    [generalOptions],
  );

  const pickImageFromCamera = useCallback(
    (options?: PickerOptions) => pickImageBySource('openCamera', options),
    [pickImageBySource],
  );

  const pickImageFromLibrary = useCallback(
    (options?: PickerOptions) => pickImageBySource('openPicker', options),
    [pickImageBySource],
  );

  const selectImageSource = useCallback(
    async ({
      // title,
      // subtitle,
      pickerOptions,
    }: SelectImageSourceParams = {}) => {
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
