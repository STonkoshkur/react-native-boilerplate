import { useCallback, useMemo, useState } from 'react';
// services
import api from 'src/services/api';
// types
import { Image } from 'src/components/Form/ImagePicker';

export const useFileUpload = () => {
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = useCallback(async (image: Image) => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      const originalFilename = image.filename
        ? image.filename
        : image.path.split('/').pop();

      formData.append('file', {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore Image from ImagePicker is not the Blob type. Well-known problem with FormData in RN.
        uri: image.path,
        name: originalFilename?.toLowerCase() ?? 'unnamed.jpg',
        type: image.mime,
        size: image.size,
      });

      const uploadedFile = await api.files.upload(formData);

      return uploadedFile;
    } catch (error) {
      console.log(error, 'handleImageUpload error');
      throw error;
    } finally {
      setIsUploading(false);
    }
  }, []);

  return useMemo(
    () => ({
      isUploading,
      uploadImage: handleImageUpload,
    }),
    [isUploading, handleImageUpload],
  );
};
