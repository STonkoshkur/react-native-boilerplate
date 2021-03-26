import { useCallback, useMemo } from 'react';
// services
import api from 'src/services/api';
// types
import { PickerFileEntity } from 'src/components/Form/ImagePicker';

export const useFileUpload = () => {
  const handleImageUpload = useCallback(async (file: PickerFileEntity) => {
    const formData = new FormData();
    const originalFilename = file.path.split('/').pop();

    if (!file.mime || !file.size || !originalFilename) {
      throw new Error('Missing data for upload');
    }

    formData.append('file', {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore Image from ImagePicker is not the Blob type. Well-known problem with FormData in RN.
      uri: file.path,
      name: originalFilename.toLowerCase(),
      type: file.mime,
      size: file.size,
    });

    return api.files.upload(formData);
  }, []);

  return useMemo(
    () => ({
      uploadImage: handleImageUpload,
    }),
    [handleImageUpload],
  );
};
