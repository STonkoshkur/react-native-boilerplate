import { FileEntity } from './FileEntity';
import { Role } from './Role';
import { Status } from './Status';

export type User = {
  id: number;
  email: string | null;
  password?: string;
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
