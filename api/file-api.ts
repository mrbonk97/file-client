import { api } from '@/lib/api';

export const fileDownload = async (fileId: string, fileName: string) => {
  const response = await api.get(`/files/${fileId}`, { responseType: 'blob' });
  if (response.status === 200) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
};

export const deleteFile = async (fileId: string) => {
  const result = await api.delete(`/files/${fileId}`);
  return result.status === 200;
};

export const fileMove = async (data: any) => {
  const result = await api.put('/files', data);
  return result.status === 200;
};

export const fileUpload = async (formDate: FormData) => {
  const headers = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  const result = await api.post('/files', formDate, headers);
  return result.status === 200;
};

export const fileMoveFolder = async (fileId: string, folderId: string) => {
  const result = await api.put('/files/change-folder', {
    fileId,
    folderId,
  });

  return result.status === 200;
};

export const searchFile = async (query: string) => {
  const result = await api.get(`/files/search?q=${query}`);
  if (result.status === 200) return result.data.files;
  return [];
};

export const shareFile = async (fileId: string) => {
  const result = await api.get(`/files/share/${fileId}`);
  if (result.status === 200) return result.data.code;
  return null;
};