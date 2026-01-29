import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';

async function bootstrap() {
  // ----------------------------------------------------
  // 🔑 Firebase Admin SDK 초기화 로직
  // ----------------------------------------------------
  if (admin.apps.length === 0) {
    try {
      const config = {
        type: process.env.type,
        project_id: process.env.project_id,
        private_key_id: process.env.private_key_id,
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
        credential: admin.credential.cert(config as admin.ServiceAccount),
      });
      console.log('✅ Firebase Admin SDK initialized successfully in main.ts.');
    } catch (e) {
      console.error('❌ Firebase Admin SDK initialization critical failure:');
      console.error(`Error details: ${e.message}`);
    }
  }

  const app = await NestFactory.create(AppModule);

  // ----------------------------------------------------
  // 🚀 CORS 최적화 설정 (에러 방지 및 속도 개선)
  // ----------------------------------------------------
  app.enableCors({
    // 💡 함수 대신 배열을 직접 넣어야 서버가 예외(500)를 던지지 않습니다.
    origin: [
      'http://localhost:3001',
      'https://yo-jeong.com',
      'https://www.yo-jeong.com', // www 도메인 반드시 포함
      'https://admin.yo-jeong.com',
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    // 💡 Preflight(OPTIONS) 요청을 24시간 동안 캐싱하여 1초 지연을 제거합니다.
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
