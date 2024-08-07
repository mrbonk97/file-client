import { FileType } from "lucide-react";

export type UserType = {
  id: number;
  name: string;
  username: string;
  email: string | null;
  userRole: string;
  enabled: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
  emailAuthenticated: string | null;
  authorities: [
    {
      authority: string;
    }
  ];
  imageUrl: string;
  maxMemory: number;
  memoryUsage: number;
  provider: string;
  providerId: string | null;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
};

export type FileType = {
  id: string;
  originalFilename: string;
  contentType: string;
  size: number;
  updatedAt: string;
  username: string;
  code: string | null;
  heart: boolean;
};

export type FolderType = {
  id: string;
  folderName: string;
  parentFolderId: string;
  username: string;
  heart: boolean;
  updatedAt: string;
};

export type RowType = FileType & FolderType;

export type FolderBreadCrumbType = {
  folder_name: string;
  id: string;
};

export enum modalType {
  "DELETE",
  "SHARE",
  "SHARE_STOP",
  "UPLOAD_FILE",
  "CREATE_FOLDER",
}
