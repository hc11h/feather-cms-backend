export interface GoogleProfile {
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  accessToken: string;
}

export interface JwtPayloadUser {
  id: string;
  email: string;
}
