import { UploadedFiles as UploadedFile } from "@prisma/client";
import { prisma } from "../../../../prisma/database/prismaClient";

import { ICreateUploadedFileDTO } from "../dtos/ICreateUploadedFileDTO";
import { IUploadedFilesRepository } from "./IUploadedFilesRepository";

export class UploadedFilesRepository implements IUploadedFilesRepository {
  async create({ post_id, path }: ICreateUploadedFileDTO): Promise<UploadedFile> {
    const uploadedFile = await prisma.uploadedFiles.create({
      data: {
        post_id,
        path
      }
    })

    return uploadedFile;
  }
}
