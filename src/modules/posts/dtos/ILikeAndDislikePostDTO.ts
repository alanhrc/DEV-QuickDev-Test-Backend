export interface ILikeOrDislikePostDTO {
  user_id: string
  post_id: string
  like: 'like' | 'dislike'
}
