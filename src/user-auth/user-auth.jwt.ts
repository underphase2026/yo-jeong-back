import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserAuthService } from './user-auth.service';
import { UserPayload } from './userPayload';

@Injectable()
export class UserStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userAuthService: UserAuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });
  }

  async validate(payload: UserPayload): Promise<any> {
    const user = await this.userAuthService.tokenValidate(payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
