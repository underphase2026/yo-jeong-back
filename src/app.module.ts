import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; // (사용되지 않아도, 일반적으로 유지)
import { AppService } from './app.service'; // (사용되지 않아도, 일반적으로 유지)
import { UserModule } from './user/user.module';
import { AgencyModule } from './agency/agency.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ConfigService를 직접 import
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthModule } from './user-auth/user-auth.module';
import { KakaoModule } from './kakao/kakao.module';

@Module({
  imports: [
    // 1. ConfigModule을 전역으로 설정
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: process.env.NODE_ENV === 'dev' ? '.env.development' : '.env', // (선택 사항: 환경별 파일 경로 지정)
    }),

    // 2. TypeORM 비동기 설정 (forRootAsync)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        // 🚨 수정 2: 엔티티 경로를 명확하게 지정
        // TypeORM 0.3.x 이상에서는 autoLoadEntities를 true로 설정하는 것이 모범 사례입니다.
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        // autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule], // 설정 값을 가져올 모듈 (예: ConfigModule)을 imports에 추가
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService], // ConfigService가 useFactory에서 사용되므로 inject 배열에 포함
    }),
    UserModule,
    AgencyModule,
    AuthModule,
    UserAuthModule,
    // KakaoModule,
  ],
  controllers: [], // AppController가 있다면 유지
  providers: [], // AppService가 있다면 유지
})
export class AppModule {}
