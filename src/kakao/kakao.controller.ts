import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';
import { KakaoService } from './kakao.service';

@Controller('kakao')
export class KakaoController {
  constructor(
    private readonly kakaoService: KakaoService,
    private readonly configService: ConfigService,
  ) {}

  // @Get('authorize')
  // // @Header('Content-Type', 'text/html')
  // async authorize(@Res() res): Promise<void> {
  //   return await this.kakaoService.authorize(res);
  // }

  // @Post('callback')
  // async callbackRedirect(@Query() query, @Res() res): Promise<void> {
  //   return await this.callbackRedirect(query, res);
  // }

  // @Get('kakao') // 카카오 서버를 거쳐서 도착하게 될 엔드포인트
  // @UseGuards(AuthGuard('kakao')) // kakao.strategy를 실행시켜 줍니다.
  // @HttpCode(301)
  // async kakaoLogin(@Req() req: Request, @Res() res: Response) {
  //   const { accessToken, refreshToken } = await this.oauthService.getJWT(
  //     req.user.kakaoId,
  //   );
  //   res.cookie('accessToken', accessToken, { httpOnly: true });
  //   res.cookie('isLoggedIn', true, { httpOnly: false });
  //   return res.redirect(this.configService.get('CLIENT_URL'));
  // }
}
