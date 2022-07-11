import { uuid } from 'uuidv4';
import { UploadedFiles as UploadedFile } from '@prisma/client'

import { ICreateUploadedFileDTO } from '../../dtos/ICreateUploadedFileDTO';
import { IUploadedFilesRepository } from '../IUploadedFilesRepository';

export class UploadedFilesRepositoryInMemory implements IUploadedFilesRepository {
  private uploadedFiles: UploadedFile[] = [];

  async create({ post_id, path }: ICreateUploadedFileDTO): Promise<UploadedFile> {
    const uploadedFile = {
      id: uuid(),
      post_id,
      path,
      created_at: new Date(),
      updated_at: new Date()
    }

    this.uploadedFiles.push(uploadedFile);

    return uploadedFile;
  }
}
