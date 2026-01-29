import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin'; // 👈 Firebase Admin SDK 임포트
import * as path from 'path'; // path와 fs는 더 이상 사용하지 않지만 일단 남겨둡니다.
import * as fs from 'fs';
import { cwd } from 'process';

async function bootstrap() {
  // ----------------------------------------------------
  // 🔑 Firebase Admin SDK 초기화 로직 수정
  // ----------------------------------------------------
  if (admin.apps.length === 0) {
    try {
      // 1. 환경 변수에서 JSON 객체 구성
      const config = {
        type: process.env.type,
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id, // ⚠️ 핵심 수정: private_key 내의 \n 문자열을 실제 개행 문자로 치환
        private_key: process.env.private_key?.replace(/\\n/g, '\n'),
        client_email: process.env.client_email,
        client_id: process.env.client_id,
        auth_uri: process.env.auth_uri,
        token_uri: process.env.token_uri,
        auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
        client_x509_cert_url: process.env.client_x509_cert_url,
        universe_domain: process.env.universe_domain,
      };
      admin.initializeApp({
        credential: admin.credential.cert(config as admin.ServiceAccount), // config 객체 자체를 사용
      });
      console.log('✅ Firebase Admin SDK initialized successfully in main.ts.');
    } catch (e) {
      console.error('❌ Firebase Admin SDK initialization critical failure:');
      console.error(`Error details: ${e.message}`);
      console.error(
        '환경 변수가 올바르게 설정되었는지, 특히 private_key가 정확한지 확인하세요.',
      );
    }
  }
  //const app = await NestFactory.create(AppModule, { cors: true });
  const app = await NestFactory.create(AppModule);

  // 2. 주석 처리되었던 whitelist와 enableCors의 봉인을 풉니다.
  const whitelist = ['http://localhost:3001', 'https://yo-jeong.com'];

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: 'Content-Type, Accept, Authorization', // 허용할 헤더 명시
    methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    // 💡 속도를 위해 maxAge를 다시 추가하는 것을 강력 추천합니다!
    maxAge: 86400,
  });
  const config = new DocumentBuilder()
    .setTitle('Under Phase API')
    .setDescription('The Under Phase API description')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
