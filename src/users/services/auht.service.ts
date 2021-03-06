import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IUserPublicDTO } from 'src/users/interfaces/user.dto';
import { UsersService } from 'src/users/services/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const res = await this.userService.validateUser(email, password);
    if (res) return res;
    return null;
  }

  generateCredentials(payload: IUserPublicDTO): Record<string, any> {
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1w' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '1w' });
    return { accessToken, refreshToken };
  }

  decodeToken(token: string): IUserPublicDTO | null {
    try {
      const payload = this.jwtService.decode(token);
      if (payload) return payload as IUserPublicDTO;
      return null;
    } catch (err) {
      return null;
    }
  }
}
