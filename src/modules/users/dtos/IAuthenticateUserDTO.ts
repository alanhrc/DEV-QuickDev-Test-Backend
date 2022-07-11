export interface IAuthenticateUserDTO {
  user: {
    name: string;
    email: string;
  },
  token: string
}
