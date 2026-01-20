import { Body, Controller, Post } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { getKakaoOidcUserInfoReqDto } from './dto/getKakaoOidcUserInfo.req.dto';
import { getKakaoOidcUserInfoResDto } from './dto/getKakaoOidcUserInfo.res.dto';

@Controller('user-auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  // @Post('getKakaoOidcUserInfo')
  // getKakaoOidcUserInfo(@Body() accessToken: string): Promise<any> {
  //   return this.userAuthService.getKakaoOidcUserInfo(accessToken);
  // }
}
