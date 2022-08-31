import { User } from '../entities/user.entity';

export interface InfLoginResponse {
  user: User;
  token: string;
}
