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
    ) =>
      await ImageCropPicker[sourceMethod]({
        // TODO: move default values to const
        width: 512,
        height: 512,
        cropping: true,
        mediaType: 'photo',
        forceJpg: true,
        // multiple: true,
        ...generalOptions,
        ...options,
      }),
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
      // Alert.alert(
      //   title ?? t('imagePicker:selectImage'),
      //   subtitle ?? t('imagePicker:sourceMessage'),
      //   [
      //     { text: t('cancel'), style: 'cancel' },
      //     {
      //       text: t('imagePicker:chooseFromLibrary'),
      //       onPress: () => pickImageFromLibrary(pickerOptions),
      //     },
      //     {
      //       text: t('imagePicker:takePhoto'),
      //       onPress: () => pickImageFromCamera(pickerOptions),
      //     },
      //   ],
      // );

      // TODO: use alert modal insteal of TMP code
      return pickImageFromLibrary(pickerOptions);
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
