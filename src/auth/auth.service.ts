// src/auth/auth.service.ts

import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AgencyService } from 'src/agency/agency.service';
import { agencyLoginReqDto } from 'src/agency/dto/agencyLogin.req.dto';
import { agencyLoginResDto } from 'src/agency/dto/agencyLogin.res.dto';
import { Agency } from 'src/entity/Agency.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Payload } from './payload';
import { payloadClass } from './payload.class';
import {
  HttpException,
  HttpStatus, // 이 파일이 NestJS 서비스라면 필요
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config'; // 'config' 사용을 위해 필요
import { HttpService } from '@nestjs/axios'; // 'this.http' 사용을 위해 필요
import { firstValueFrom } from 'rxjs'; // 'firstValueFrom' 사용을 위해 필요
import * as jwt from 'jsonwebtoken'; // 'jwt' 사용을 위해 필요
import { UserService } from 'src/user/user.service';
import axios from 'axios';
// src/auth/auth.service.ts 파일 상단에 추가

import * as qs from 'qs';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    // private agencyService: AgencyService,
    @InjectRepository(Agency) private agencyRepository: Repository<Agency>,
    private readonly config: ConfigService, // 'config' 사용
    private readonly http: HttpService, // 'this.http' 사용
    private readonly userService: UserService,
  ) {}

  // // 💡 카카오에서 받은 사용자 정보를 처리하고 DB에 저장/조회하는 로직
  // async validateKakaoUser(kakaoUser: any): Promise<any> {
  //   // 1. DB에서 kakaoId로 기존 사용자를 조회합니다.
  //   let user = await this.findUserByKakaoId(kakaoUser.kakaoId);

  //   // 2. 사용자가 없으면 새로 생성합니다.
  //   if (!user) {
  //     user = await this.createUser(kakaoUser);
  //   }

  //   // 3. JWT 토큰을 생성하여 반환합니다.
  //   const payload = { userId: user.id, nickname: user.nickname };
  //   return {
  //     access_token: this.jwtService.sign(payload),
  //   };
  // }

  // // (실제 구현 필요) DB에서 사용자 조회/생성 로직
  // private async findUserByKakaoId(kakaoId: string) {
  //   /* ... */ return { id: 1, nickname: 'TestUser' };
  // }
  // private async createUser(kakaoUser: any) {
  //   /* ... */ return { id: 1, nickname: 'TestUser' };
  // }

  async validateAgency(dto: agencyLoginReqDto): Promise<agencyLoginResDto> {
    const agency = await this.findByfield({
      where: { user_id: dto.user_id, password: dto.password },
    });
    if (!agency) {
      throw new NotFoundException();
    }

    const payloadclass = new payloadClass();
    payloadclass.payload.id = agency.id;
    payloadclass.payload.user_id = agency.user_id;

    const accessToken = this.jwtService.sign(payloadclass.payload);

    const response = new agencyLoginResDto();
    response.authToken = accessToken;
    return response;
  }

  async findByfield(options: FindOneOptions<Agency>): Promise<Agency | null> {
    return this.agencyRepository.findOne(options);
  }

  async tokenValidate(payload: Payload): Promise<Agency | null> {
    return this.findByfield({
      where: { id: payload.id },
    });
  }

  // async kakaoLogin(options: { code: string; domain: string }): Promise<any> {
  //   const { code, domain } = options;
  //   const kakaoKey = '1b56c06c50ad2a8ad7361b8f11b2da23';
  //   const kakaoTokenUrl = 'https://kauth.kakao.com/oauth/token';
  //   const kakaoUserInfoUrl = 'https://kapi.kakao.com/v2/user/me';
  //   const body = {
  //     grant_type: 'authorization_code',
  //     client_id: kakaoKey,
  //     redirect_uri: `${domain}/kakao-callback`,
  //     code,
  //   };
  //   const headers = {
  //     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //   };
  //   try {
  //     const response = await axios({
  //       method: 'POST',
  //       url: kakaoTokenUrl,
  //       timeout: 30000,
  //       headers,
  //       data: qs.stringify(body),
  //     });
  //     if (response.status === 200) {
  //       console.log(`kakaoToken : ${JSON.stringify(response.data)}`);
  //       // Token 을 가져왔을 경우 사용자 정보 조회
  //       const headerUserInfo = {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
  //         Authorization: 'Bearer ' + response.data.access_token,
  //       };
  //       console.log(`url : ${kakaoTokenUrl}`);
  //       console.log(`headers : ${JSON.stringify(headerUserInfo)}`);
  //       const responseUserInfo = await axios({
  //         method: 'GET',
  //         url: kakaoUserInfoUrl,
  //         timeout: 30000,
  //         headers: headerUserInfo,
  //       });
  //       console.log(`responseUserInfo.status : ${responseUserInfo.status}`);
  //       if (responseUserInfo.status === 200) {
  //         console.log(
  //           `kakaoUserInfo : ${JSON.stringify(responseUserInfo.data)}`,
  //         );
  //         return responseUserInfo.data;
  //       } else {
  //         throw new UnauthorizedException();
  //       }
  //     } else {
  //       throw new UnauthorizedException();
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new UnauthorizedException();
  //   }
  // }
}
