// src/auth/kakao.strategy.ts

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-kakao';
import { AuthService } from './auth.service'; // 사용자 인증 로직을 처리할 서비스

// @Injectable()
// export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
//   constructor(private authService: AuthService) {
//     super({
//       // ⚠️ 카카오 개발자 설정에서 얻은 값으로 대체하세요.
//       clientID: 'e7205f8123f7454f9c3d6eb749da8c50',
//       callbackURL: 'YOUR_REDIRECT_URI', // 예: http://localhost:3000/auth/kakao/callback
//     });
//   }

//   async validate(
//     accessToken: string,
//     refreshToken: string,
//     profile: any,
//     done: Function,
//   ): Promise<any> {
//     const kakao_account = profile._json.kakao_account;

//     // 💡 카카오 프로필에서 필요한 사용자 정보를 추출합니다.
//     const user = {
//       kakaoId: profile.id, // 카카오 고유 ID
//       email: kakao_account.email,
//       nickname: kakao_account.profile.nickname,
//       // 기타 정보 (예: 프로필 이미지 등)
//     };

//     // AuthService를 통해 사용자 정보를 DB에 저장하거나 조회합니다.
//     const result = await this.authService.validateKakaoUser(user);

//     // Passport에게 인증 성공 및 사용자 정보 전달
//     done(null, result);
//   }
// }
