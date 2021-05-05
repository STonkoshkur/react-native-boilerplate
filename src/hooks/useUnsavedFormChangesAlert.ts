import { useCallback, useMemo } from 'react';
import { Alert } from 'react-native';
// navigation
import { useNavigation } from '@react-navigation/native';
// localization
import { useTranslation } from 'react-i18next';

type UnsavedFormChangesCancellationParams = {
  title?: string;
  description?: string;
  stayOnPageText?: string;
  discardChangesText?: string;
  onDiscardChanges?: () => void;
};

export const useUnsavedFormChangesAlert = (
  doesFormHasUnsavedChanges: boolean,
) => {
  const navigation = useNavigation();
  const { t } = useTranslation(['common']);

  const handleUnsavedFormChangesCancellation = useCallback(
    ({
      title,
      description,
      stayOnPageText,
      discardChangesText,
      onDiscardChanges = navigation.goBack,
    }: UnsavedFormChangesCancellationParams = {}) => {
      console.log(
        t,
        t('common:unsavedFormChanges'),
        't handleUnsavedFormChangesCancellation',
      );
      if (doesFormHasUnsavedChanges) {
        Alert.alert(
          title ?? t('common:unsavedFormChanges'),
          description ?? t('common:unsavedFormChangesDescription'),
          [
            {
              text: stayOnPageText ?? t('common:stayOnPage'),
              style: 'cancel',
            },
            {
              style: 'destructive',
              text: discardChangesText ?? t('common:leavePage'),
              onPress: onDiscardChanges,
            },
          ],
        );
      } else {
        navigation.goBack();
      }
    },
    [doesFormHasUnsavedChanges, navigation, t],
  );

  return useMemo(
    () => ({
      handleUnsavedFormChangesCancellation,
    }),
    [handleUnsavedFormChangesCancellation],
  );
};
