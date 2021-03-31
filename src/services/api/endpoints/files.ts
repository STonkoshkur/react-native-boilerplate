// services
import axios from 'src/services/api/axios';
// entities
import { FileEntity } from 'src/entities/FileEntity';

export default {
  get: (path: string): Promise<unknown> => axios.get(`files/${path}`),
  upload: (data: FormData): Promise<FileEntity> =>
    axios.post('files/upload', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};
