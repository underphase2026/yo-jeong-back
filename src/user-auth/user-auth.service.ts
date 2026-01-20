import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { UserPayload } from './userPayload';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import * as admin from 'firebase-admin'; // 👈 Firebase Admin SDK 임포트
// import * as path from 'path'; // 👈 초기화 로직이 main.ts로 이동하여 불필요
// import * as fs from 'fs'; // 👈 초기화 로직이 main.ts로 이동하여 불필요
// import { cwd } from 'process'; // 👈 초기화 로직이 main.ts로 이동하여 불필요

interface DecodedKakaoUser {
  firebaseUid: string;
  kakaoId: string;
  email: string;
}

@Injectable()
export class UserAuthService {
  private readonly logger = new Logger(UserAuthService.name);
  private readonly KAKAO_API_URL = 'https://kapi.kakao.com/v2/user/me';
  private readonly KAKAO_OIDC_USERINFO_URL =
    'https://kapi.kakao.com/v1/oidc/userinfo';
  constructor(
    // private jwtService: JwtService,
    private httpService: HttpService,
    @InjectRepository(KakaoUser)
    private kakaoUserRepository: Repository<KakaoUser>,
  ) {
    // ----------------------------------------------------
    // ❌ main.ts로 이동한 Firebase 초기화 로직은 여기서 제거합니다.
    // ----------------------------------------------------
  }

  /**
   * TypeORM 옵션을 사용하여 DB에서 사용자를 조회합니다.
   * @param options TypeORM FindOneOptions
   * @returns KakaoUser 엔티티 또는 null
   */
  async findByfield(
    options: FindOneOptions<KakaoUser>,
  ): Promise<KakaoUser | null> {
    return this.kakaoUserRepository.findOne(options);
  }

  /**
   * JWT Payload를 기반으로 DB에서 사용자를 검증합니다.
   * @param userPayload 검증할 JWT Payload
   * @returns KakaoUser 엔티티 또는 null
   */
  async tokenValidate(userPayload: UserPayload): Promise<KakaoUser | null> {
    return this.findByfield({
      where: { kakaoId: userPayload.kakaoId },
    });
  }

  // --- Firebase ID Token 검증 ---

  /**
   * Firebase ID Token의 유효성을 검증하고 디코딩된 사용자 정보를 반환합니다.
   * @param token Firebase ID Token
   * @returns 디코딩된 사용자 정보 (firebaseUid, kakaoId, email)
   */
  async verifyFirebaseToken(token: string): Promise<DecodedKakaoUser> {
    // 💡 main.ts에서 Admin SDK가 초기화되었다고 가정하고 바로 사용합니다.
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);

      // 토큰 페이로드에서 필요한 정보(카카오 ID 포함)를 추출합니다.
      // OIDC Provider ID는 'oidc.kakao'가 맞는지 Firebase 설정을 확인해주세요.
      const kakaoId = decodedToken.firebase.identities['oidc.kakao']?.[0];

      if (!kakaoId) {
        throw new UnauthorizedException(
          '토큰에 카카오 OIDC 정보(kakaoId)가 없습니다.',
        );
      }

      return {
        firebaseUid: decodedToken.uid,
        kakaoId: kakaoId,
        email: decodedToken.email ?? '',
      };
    } catch (error) {
      console.error('Firebase Token Verification Error:', error.message);
      throw new UnauthorizedException(
        '유효하지 않거나 만료된 인증 토큰입니다.',
      );
    }
  }

  // --- 카카오 OIDC Access Token을 통한 사용자 정보 조회 ---

  /**
   * 카카오 OIDC Access Token을 사용하여 사용자 정보를 조회합니다.
   * (견적서 등록 시 DB에 정보가 없을 경우 대체 저장 용도로 사용)
   * @param accessToken 카카오 Access Token
   * @returns 카카오 OIDC 사용자 정보 객체 (sub, email 등)
   */
  async getKakaoOidcUserInfo(accessToken: string): Promise<any> {
    try {
      this.logger.debug(
        `[Kakao OIDC API] Attempting to fetch user info with token...`,
      );

      const response = await firstValueFrom(
        this.httpService.get(this.KAKAO_OIDC_USERINFO_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );

      this.logger.debug(
        `[Kakao OIDC API] Success! User Subject (sub): ${response.data.sub}`,
      );
      return response.data;
    } catch (error) {
      const kakaoError = error.response?.data;
      const errorMessage = kakaoError?.msg || error.message;

      this.logger.error(`[Kakao OIDC API] Call Error: ${errorMessage}`);

      throw new UnauthorizedException(
        `카카오 OIDC Access Token 검증 실패: (${JSON.stringify(kakaoError)})`,
      );
    }
  }
}
