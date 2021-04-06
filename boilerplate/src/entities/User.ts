import { FileEntity } from 'src/entities/FileEntity';
import { Role } from 'src/entities/Role';
import { Status } from 'src/entities/Status';

export type User = {
  id: number;
  email: string | null;
  provider: string;
  socialId?: string | null;
  firstName: string | null;
  lastName: string | null;
  photo?: FileEntity | null;
  role?: Role | null;
  status?: Status;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};
