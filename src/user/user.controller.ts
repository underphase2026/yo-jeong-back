import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Query,
  Req,
  Res,
  Response,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { kakaoLoginReqDto } from './dto/kakaoLogin.req.dto';
import { kakaoLoginResDto } from './dto/kakaoLogin.res.dto';
import { kakaoSignupCallbackReqDto } from './dto/kakaoSignupCallback.req.dto';
import { kakaoSignupCallbackResDto } from './dto/kakaoSignupCallback.res.dto';
import { searchAgenciesReqDto } from './dto/searchAgencies.req.dto';
import { searchAgenciesResDto } from './dto/searchAgencies.res.dto';
import { getAgencyDetailReqDto } from './dto/getAgencyDetail.req.dto';
import { getAgencyDetailResDto } from './dto/getAgencyDetail.res.dto';
import { chooseAgencyReqDto } from './dto/chooseAgency.req.dto';
import { chooseAgencyResDto } from './dto/chooseAgency.res.dto';
import { confirmVisitReqDto } from './dto/confirmVisit.req.dto';
import { confirmVisitResDto } from './dto/confirmVisit.res.dto';
import { cancelReservationReqDto } from './dto/cancelReservation.req.dto';
import { cancelReservationResDto } from './dto/cancelReservation.res.dto';
import { registerQuoteReqDto } from './dto/registerQuote.req.dto';
import { resisterQuoteResDto } from './dto/registerQuote.res.dto';
import { getQuoteReqDto } from './dto/getQuote.req.dto';
import { getQuoteResDto } from './dto/getQuote.res.dto';
import { AuthService } from 'src/auth/auth.service';
import { getSubsidyReqDto } from './dto/getSubsidy.req.dto';
import { getSubsidyResDto } from './dto/getSubsidy.res.dto';
import { UserAuthGuard } from 'src/user-auth/user-auth.guard';
import { userPayloadClass } from 'src/user-auth/userPayload.class';
import { UserPayload } from 'src/user-auth/userPayload';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('kakaoLogin')
  // @ApiOperation({ summary: '카카오 로그인' })
  // @ApiResponse({
  //   status: 201,
  //   description: '로그인 성공',
  //   type: kakaoLoginResDto,
  // })
  // @ApiBadRequestResponse({ description: '로그인 실패' })
  // @ApiNotFoundResponse({ description: '해당 카카오 아이디 보유 유저 없음' })
  // async kakaoLogin(@Body() dto: kakaoLoginReqDto): Promise<kakaoLoginResDto> {
  //   return this.userService.kakaoLogin(dto);
  // }

  // @Get('kakaoSignupCallback')
  // @ApiOperation({ summary: '카카오 회원가입 콜백' })
  // @ApiResponse({
  //   status: 201,
  //   description: '회원가입 콜백 성공',
  //   type: kakaoSignupCallbackResDto,
  // })
  // @ApiBadRequestResponse({ description: '회원가입 콜백 실패' })
  // @ApiNotFoundResponse({ description: '해당 카카오 아이디 보유 유저 없음' })
  // async kakaoSignupCallback(@Query('code') code: string, @Res() res: Response) {
  //   try {
  //     const token = await this.authService.getKakaoAccessToken(code);
  //   } catch {
  //     return new HttpException('kakao login failed', 500);
  //   }
  // }

  @Post('searchAgencies')
  @ApiOperation({ summary: '판매점 검색' })
  @ApiResponse({
    status: 201,
    description: '판매점 검색 성공',
    type: searchAgenciesResDto,
  })
  // 리스트로 res 되게 변경
  @ApiBadRequestResponse({ description: '판매점 검색 실패' })
  @ApiNotFoundResponse({ description: '조건에 맞는 판매점 없음' })
  async searchAgencies(
    @Body() dto: searchAgenciesReqDto,
  ): Promise<searchAgenciesResDto> {
    return this.userService.searchAgencies(dto);
  }

  @Post('getAgencyDetail')
  //get 으로 하면 id 취탈가능성 존재
  //그러므로 get >> post
  @ApiOperation({ summary: '판매점 상세정보 조회' })
  @ApiResponse({
    status: 201,
    description: '판매점 상세정보 조회 성공',
    type: getAgencyDetailResDto,
  })
  @ApiBadRequestResponse({ description: '판매점 상세정보 조회 실패' })
  @ApiNotFoundResponse({ description: '해당 판매점 없음' })
  async getAgencyDetail(
    @Body() dto: getAgencyDetailReqDto,
  ): Promise<getAgencyDetailResDto> {
    return this.userService.getAgencyDetail(dto);
  }

  @Post('registerQuote')
  @ApiBearerAuth()
  @ApiOperation({ summary: '견적서 등록' })
  @ApiResponse({
    status: 201,
    description: '견적서 등록 성공',
    type: resisterQuoteResDto,
  })
  @ApiBadRequestResponse({ description: '견적서 등록 실패' })
  @UseGuards(UserAuthGuard)
  async registerQuote(
    @Body() dto: registerQuoteReqDto,
    @Req() req: Request,
  ): Promise<resisterQuoteResDto> {
    const kakaoUser: UserPayload = req['user'];
    // console.debug(kakaoUser);

    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('인증 토큰(Bearer)이 필요합니다.');
    }
    const token = authHeader.split(' ')[1].trim();
    return this.userService.registerQuote(dto, kakaoUser, token);
    // return this.userService.registerQuote(dto, kakaoUser);
  }

  @Get('getQuote')
  // @ApiBearerAuth()
  @ApiOperation({ summary: '견적서 조회' })
  @ApiResponse({
    status: 201,
    description: '견적서 조회 성공',
    type: getQuoteResDto,
  })
  @ApiBadRequestResponse({ description: '견적서 조회 실패' })
  @ApiNotFoundResponse({ description: '해당 견적서 없음' })
  // @UseGuards(UserAuthGuard)
  async getQuote(
    @Query() dto: getQuoteReqDto,
    @Req() req: Request,
  ): Promise<getQuoteResDto> {
    return this.userService.getQuote(dto);
  }

  @Get('getSubsidy')
  @ApiOperation({ summary: '공통지원금 조회' })
  @ApiResponse({
    status: 201,
    description: '지원금 조회 성공',
    type: getSubsidyResDto,
  })
  @ApiBadRequestResponse({ description: '지원금 조회 실패' })
  async getSubsidy(@Query() dto: getSubsidyReqDto): Promise<getSubsidyResDto> {
    return this.userService.getSubsidy(dto);
  }
}
