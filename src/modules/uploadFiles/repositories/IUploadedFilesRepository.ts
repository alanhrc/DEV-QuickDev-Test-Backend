import { UploadedFiles as UploadedFile } from '@prisma/client';
import { ICreateUploadedFileDTO } from '../dtos/ICreateUploadedFileDTO';

export interface IUploadedFilesRepository {
  create: ({ post_id, path }: ICreateUploadedFileDTO) => Promise<UploadedFile>
}
