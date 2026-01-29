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

  // CORS 설정을 세부적으로 제어하기 위해 기본 { cors: true } 대신 enableCors를 사용합니다.
  const app = await NestFactory.create(AppModule);

  // ----------------------------------------------------
  // 🚀 CORS 최적화 설정 (속도 개선 핵심)
  // ----------------------------------------------------
  const whitelist = ['http://localhost:3001', 'https://yo-jeong.com'];

  app.enableCors({
    origin: (origin, callback) => {
      // whitelist에 있거나 origin이 없는 경우(Postman 등) 허용
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Authorization',
    // 💡 핵심: OPTIONS 요청 결과를 24시간 동안 브라우저에 저장합니다.
    // 140ms나 걸리는 Preflight 요청 횟수를 획기적으로 줄여줍니다.
    maxAge: 86400,
    preflightContinue: false,
    optionsSuccessStatus: 204,
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
