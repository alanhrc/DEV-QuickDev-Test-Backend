export interface IUploadFilesPostDTO {
  user_id: string
  post_id: string
  files: Express.Multer.File[]
}
