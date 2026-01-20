import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Profile, Strategy } from 'passport-kakao';
import { KakaoService } from './kakao.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly configService: ConfigService,
  ) {
    // 💡 1. super()를 먼저 호출하며 this.configService를 인라인으로 사용하여 TS17009 오류 해결
    // 💡 2. scope 속성을 제거하여 TS2345 오류를 해결
    super({
      // ✅ 필수 값이 누락되지 않음을 단언(!)합니다. (환경 설정이 필요합니다)
      clientID: configService.get<string>('KAKAO_CLIENT_ID')!,
      clientSecret: configService.get<string>('KAKAO_CLIENT_SECRET')!,
      callbackURL: configService.get<string>('KAKAO_CALLBACK_URL')!,

      // 💡 Profile 정보를 더 가져오려면 아래 옵션을 사용합니다 (선택 사항)
      // profileFields: ['profile', 'account_email']
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ): Promise<void> {
    try {
      const { _json } = profile;

      // 💡 실제 구현 시 DB에서 사용자 조회/생성 로직이 포함됩니다.
      const user = {
        kakaoId: _json.id,
      };

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  }
}
