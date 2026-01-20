// src/user-auth/user-auth.module.ts

import { forwardRef, Module, OnModuleInit } from '@nestjs/common'; // OnModuleInit 추가
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { AgencyModule } from 'src/agency/agency.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserStrategy } from './user-auth.jwt';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { UserAuthGuard } from './user-auth.guard';
// Firebase 초기화에 필요한 라이브러리 추가
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';

@Module({
  imports: [
    forwardRef(() => AgencyModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([KakaoUser]),
    HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JWT 설정 (기존 로직 유지)
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService): JwtModuleOptions => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET must be defined');
        }
        const expires = config.get<string>('JWT_EXPIRATION_TIME');

        let expiresIn: string | number | undefined = undefined;

        if (expires) {
          expiresIn = isNaN(Number(expires)) ? expires : Number(expires);
        }

        return {
          secret,
          signOptions: { expiresIn: expiresIn as any },
        };
      },
    }),
  ],
  providers: [UserAuthService, UserStrategy, UserAuthGuard],
  controllers: [UserAuthController],
  exports: [UserAuthService, PassportModule, JwtModule],
})
// 🚨 OnModuleInit 인터페이스를 구현하고 초기화 로직 추가
export class UserAuthModule implements OnModuleInit {
  onModuleInit() {
    if (admin.apps.length === 0) {
      const config = {
        type: process.env.type,
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id,
        private_key: process.env.private_key,
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        auth_uri: process.env.auth_uri,
        token_uri: process.env.token_uri,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.client_x509_cert_url,
        universe_domain: process.env.universe_domain,
      };
      const json = JSON.stringify(config);
      console.debug(config);
      console.debug(json);
      try {
        // 1. 서비스 계정 JSON 파일 경로 설정 (프로젝트 루트 기준)
        const serviceAccountPath = path.resolve(json);

        // console.log(
        //   `[DEBUG/ModuleInit] Resolved Firebase Key Path: ${serviceAccountPath}`,
        // );

        // 2. 파일 내용을 동기적으로 읽기
        const serviceAccountJson = fs.readFileSync(serviceAccountPath, 'utf8');
        const serviceAccount = JSON.parse(serviceAccountJson);

        // 3. Admin SDK 초기화
        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
          // databaseURL: '...', // 필요한 경우 추가
        });

        // console.log(
        //   '✅ [ModuleInit] Firebase Admin SDK initialized successfully.',
        // );
      } catch (e) {
        // 초기화 실패는 앱 시작 시 치명적이므로 명확하게 로깅합니다.
        // console.error(
        //   '❌ [CRITICAL ERROR] Firebase Admin SDK initialization failed during module setup.',
        // );
        // console.error(`Error details (Check path/JSON key): ${e.message}`);
        // // 런타임에 이 오류가 발생하면, 앱 시작이 실패할 수 있습니다.
      }
    }
  }
}
