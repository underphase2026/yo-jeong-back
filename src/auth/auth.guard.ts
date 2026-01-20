import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Payload } from './payload';
import { payloadClass } from './payload.class';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    // const authHeader = request.headers.authorization;
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException();
    }
    const token = authHeader.split(' ')[1];

    try {
      const payload: Payload = await this.jwtService.verify(token);
      const agencyPayload = new payloadClass();
      agencyPayload.payload.id = payload.id;
      agencyPayload.payload.user_id = payload.user_id;
      request['agency'] = agencyPayload;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
