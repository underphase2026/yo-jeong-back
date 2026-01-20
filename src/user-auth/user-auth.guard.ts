import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';

// 요청 객체에 디코딩된 사용자 정보를 추가하기 위한 타입 정의
interface RequestWithKakaoUser extends Request {
  user: {
    firebaseUid: string;
    kakaoId: string;
    email: string;
  } | null;
}

@Injectable()
export class UserAuthGuard implements CanActivate {
  // JwtService, HttpService 등 카카오 Access Token 검증에 필요한 의존성은 제거합니다.
  constructor(private readonly userAuthService: UserAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Request 타입 캐스팅 (Node.js의 Http IncomingMessage 기준)
    const request = context.switchToHttp().getRequest() as RequestWithKakaoUser;

    // Authorization 헤더에서 토큰 추출
    const authHeader = request.headers['authorization'];

    // 1. 헤더 유효성 검사
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('인증 토큰(Bearer)이 필요합니다.');
    }

    // 토큰 추출 및 공백 제거 (trim 필수)
    const token = authHeader.split(' ')[1].trim();

    try {
      // 2. 서비스 메서드를 호출하여 Firebase ID Token 검증 및 정보 추출
      const decodedUserInfo =
        await this.userAuthService.verifyFirebaseToken(token);

      console.log('인증 성공. 추출된 사용자 정보:', decodedUserInfo);

      // 3. 요청 객체에 정제된 사용자 정보를 추가
      request.user = decodedUserInfo;

      return true; // 인증 성공
    } catch (error) {
      // UserAuthService에서 던진 UnauthorizedException을 포함하여 모든 에러 처리
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException(
        '인증에 실패했습니다. 유효하지 않은 토큰 형식입니다.',
      );
    }
  }
}
