import { User } from 'src/schemas/user.schema';

export class LoginResponseDto {
  accessToken: string;
  user: User;
}
