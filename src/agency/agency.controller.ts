import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AgencyService } from './agency.service';
import { agencyLoginReqDto } from './dto/agencyLogin.req.dto';
import { agencyLoginResDto } from './dto/agencyLogin.res.dto';
import { agencyPasswordResetReqDto } from './dto/agencyPasswordReset.req.dto';
import { agencyPasswordResetResDto } from './dto/agencyPasswordReset.res.dto';
import { enrollPriceListReqDto } from './dto/enrollPriceList.req.dto';
import { enrollPriceListResDto } from './dto/enrollPriceList.res.dto';
import { modifyListReqDto } from './dto/modifyList.req.dto';
import { modifyListResDto } from './dto/modifyList.res.dto';
import { deletePriceListReqDto } from './dto/deletePriceList.req.dto';
import { deletePriceListResDto } from './dto/deletePriceList.res.dto';
import { registerRatePlanReqDto } from './dto/registerRatePlan.req.dto';
import { registerRatePlanResDto } from './dto/registerRatePlan.res.dto';
import { getAgencyDetailReqDto } from 'src/user/dto/getAgencyDetail.req.dto';
import { getAgencyDetailResDto } from 'src/user/dto/getAgencyDetail.res.dto';
import { getAgencyRatePlansResDto } from './dto/getAgencyRatePlans.res.dto';
import { getAgencyRatePlansReqDto } from './dto/getAgencyRatePlans.req.dto';
import { deleteRatePlanReqDto } from './dto/deleteRatePlan.req.dto';
import { deleteRatePlanResDto } from './dto/deleteRatePlan.res.dto';
import { checkReservationResDto } from './dto/checkReservation.res.dto';
import { checkReservationReqDto } from './dto/checkReservation.req.dto';
import { getAgencyReservationsResDto } from './dto/getAgencyReservations.res.dto';
import { getAgencyReservationsReqDto } from './dto/getAgencyReservations.req.dto';
import { getRatePlanDetailReqDto } from './dto/getRatePlanDetail.req.dto';
import { getRatePlanDetailResDto } from './dto/getRatePlanDetail.res.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { agencyRegisterResDto } from './dto/agencyRegister.res.dto';
import { Agency } from 'src/entity/Agency.entity';
import { agencyRegisterReqDto } from './dto/agencyRegister.req.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { payloadClass } from 'src/auth/payload.class';
import { getAllPriceListReqDto } from './dto/getAllPriceList.req.dto';
import { getAllPriceListResDto } from './dto/getAllPriceList.res.dto';
import { enrollSubsidyReqDto } from './dto/enrollSubsidy.req.dto';
import { enrollSubsidyResDto } from './dto/enrollSubsidy.res.dto';
import { getSubsidyReqDto } from 'src/user/dto/getSubsidy.req.dto';
import { getSubsidyResDto } from 'src/user/dto/getSubsidy.res.dto';
import { getStatusAgencyResDto } from './dto/getStatusAgency.res.dto';
import { getStatusAgencyReqDto } from './dto/getStatusAgency.req.dto';
import { getStatusQuoteReqDto } from './dto/getStatusQuote.req.dto';
import { getStatusQuoteResDto } from './dto/getStatusQuote.res.dto';
import { getQuoteDetailReqDto } from './dto/getQuoteDetail.req.dto';
import { getQuoteDetailResDto } from './dto/getQuoteDetail.res.dto';
import { getPriceListByPhoneReqDto } from './dto/getPriceListByPhone.req.dto';
import { getPriceListByPhoneResDto } from './dto/getPriceListByPhone.res.dto';
import { enrollPriceListDetailReqDto } from './dto/enrollPriceListDetail.req.dto';
import { enrollPriceListDetailResDto } from './dto/enrollPriceListDetail.res.dto';
import { checkIsUserVisitReqDto } from './dto/checkIsUserVisit.req.dto';
import { checkIsUserVisitResDto } from './dto/checkIsUserVisit.res.dto';
import { checkLoginReqDto } from './dto/checkLogin.req.dto';
import { checkLoginResDto } from './dto/checkLogin.res.dto';

@Controller('agency')
export class AgencyController {
  constructor(
    private readonly agencyService: AgencyService,
    private readonly authService: AuthService,
  ) {}

  @Post('agencyLogin')
  // @ApiBearerAuth()
  @ApiOperation({ summary: '판매점 로그인' })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: agencyLoginResDto,
  })
  @ApiBadRequestResponse({ description: '로그인 실패' })
  @ApiNotFoundResponse({ description: '해당 정보 보유 판매점 유저 없음' })
  async agencyLogin(
    @Body() dto: agencyLoginReqDto,
  ): Promise<agencyLoginResDto> {
    return this.agencyService.agencyLogin(dto);
    // return this.authService.validateAgency(dto);
  }

  @Post('agencyRegister')
  @ApiOperation({ summary: '판매점 회원가입' })
  @ApiResponse({
    status: 201,
    description: '회원가입 성공',
    type: agencyRegisterResDto,
  })
  @ApiBadRequestResponse({ description: '회원가입 실패' })
  async agencyRegister(
    @Body() dto: agencyRegisterReqDto,
  ): Promise<agencyRegisterResDto> {
    return this.agencyService.agencyRegister(dto);
  }

  @Post('agencyPasswordReset')
  @ApiBearerAuth()
  @ApiOperation({ summary: '판매점 비밀번호 찾기' })
  @ApiResponse({
    status: 201,
    description: '비밀번호 찾음',
    type: agencyPasswordResetResDto,
  })
  @ApiNotFoundResponse({ description: '해당 판매점 아이디 보유 유저 없음' })
  async agencyPasswordReset(
    @Body() dto: agencyPasswordResetReqDto,
    @Req() req: Request,
  ): Promise<agencyPasswordResetResDto> {
    const agency = req['agency'] as Agency;
    return this.agencyService.agencyPasswordReset(dto, agency);
  }

  // @Post('enrollPriceList')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '가격 리스트 등록' })
  // @ApiResponse({
  //   status: 201,
  //   description: '등록 성공',
  //   type: enrollPriceListResDto,
  // })
  // @ApiBadRequestResponse({ description: '등록 실패' })
  // @ApiNotFoundResponse({
  //   description: '중복되는 가격 리스트 정보 존재함',
  // })
  // @UseGuards(AuthGuard)
  // async enrollPriceList(
  //   @Body() dto: enrollPriceListReqDto,
  //   @Req() req: Request,
  // ): Promise<enrollPriceListResDto> {
  //   const agency: payloadClass = req['agency'];
  //   return this.agencyService.enrollPriceList(dto, agency);
  // }

  // @Post('modifyPriceList')
  // @ApiBearerAuth()
  // @ApiOperation({ summary: '가격 리스트 수정' })
  // @ApiResponse({
  //   status: 201,
  //   description: '수정 성공',
  //   type: modifyListResDto,
  // })
  // @ApiBadRequestResponse({ description: '수정 실패' })
  // @ApiNotFoundResponse({ description: '해당 정보 보유 가격 리스트 없음' })
  // @UseGuards(AuthGuard)
  // async modifyPriceList(
  //   @Body() dto: modifyListReqDto,
  //   @Req() req: Request,
  // ): Promise<modifyListResDto> {
  //   const agency: payloadClass = req['agency'];
  //   return this.agencyService.modifyPriceList(dto, agency);
  // }

  // @Get('getAllPriceList')
  // @ApiOperation({ summary: '등록된 모든 가격 리스트 조회' })
  // @ApiResponse({
  //   status: 201,
  //   description: '조회 성공',
  //   type: getAllPriceListResDto,
  // })
  // @ApiBadRequestResponse({ description: '' })
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard)
  // async getAllPriceList(
  //   // @Query() dto: getAllPriceListReqDto,
  //   @Req() req: Request,
  // ): Promise<getAllPriceListResDto> {
  //   const agency: payloadClass = req['agency'];
  //   return this.agencyService.getAllPriceList(agency);
  // }

  // @Delete('deletePriceList')
  // @ApiOperation({ summary: '가격 리스트 삭제' })
  // @ApiResponse({
  //   status: 201,
  //   description: '삭제 성공',
  //   type: deletePriceListResDto,
  // })
  // @ApiBadRequestResponse({ description: '삭제 실패' })
  // @ApiNotFoundResponse({ description: '해당 정보 보유 가격 리스트 없음' })
  // async deletePriceList(
  //   @Body() dto: deletePriceListReqDto,
  // ): Promise<deletePriceListResDto> {
  //   return this.agencyService.deletePriceList(dto);
  // }
  /////////////////////////////////////////////////////////////////////

  // @Post('registerRatePlan')
  // @ApiOperation({ summary: '요금제 등록' })
  // @ApiResponse({
  //   status: 201,
  //   description: '등록 성공',
  //   type: registerRatePlanResDto,
  // })
  // @ApiBadRequestResponse({ description: '등록 실패' })
  // async registerRatePlan(
  //   @Body() dto: registerRatePlanReqDto,
  // ): Promise<registerRatePlanResDto> {
  //   return this.agencyService.registerRatePlan(dto);
  // }

  // @Get('getAgencyRatePlans')
  // @ApiOperation({ summary: '요금제 리스트 조회' })
  // @ApiResponse({
  //   status: 201,
  //   description: '조회 성공',
  //   type: getAgencyRatePlansResDto,
  // })
  // @ApiBadRequestResponse({ description: '조회 실패' })
  // @ApiNotFoundResponse({ description: '해당 정보 보유 요금제 리스트 없음' })
  // async getAgencyRatePlans(
  //   @Query() dto: getAgencyRatePlansReqDto,
  // ): Promise<getAgencyRatePlansResDto> {
  //   return this.agencyService.getAgencyRatePlans(dto);
  // }

  // @Get('getRatePlanDetail')
  // @ApiOperation({ summary: '요금제 상세 정보 단건 조회' })
  // @ApiResponse({
  //   status: 201,
  //   description: '상세 조회 성공',
  //   type: getRatePlanDetailResDto,
  // })
  // @ApiBadRequestResponse({ description: '상세 조회 실패' })
  // @ApiNotFoundResponse({ description: '해당 정보 보유 요금제 리스트 없음' })
  // async getRatePlanDetail(
  //   @Query() dto: getRatePlanDetailReqDto,
  // ): Promise<getRatePlanDetailResDto> {
  //   return this.agencyService.getRatePlanDetail(dto);
  // }

  // @Delete('deleteRatePlan')
  // @ApiOperation({ summary: '요금제 리스트 삭제' })
  // @ApiResponse({
  //   status: 201,
  //   description: '삭제 성공',
  //   type: deleteRatePlanResDto,
  // })
  // @ApiBadRequestResponse({ description: '삭제 실패' })
  // @ApiNotFoundResponse({ description: '해당 정보 보유 요금제 리스트 없음' })
  // async deleteRatePlan(
  //   @Body() dto: deleteRatePlanReqDto,
  // ): Promise<deleteRatePlanResDto> {
  //   return this.agencyService.deleteRatePlan(dto);
  // }

  // @Post('checkReservation')
  // @ApiOperation({ summary: '개통 예약 요청 건 처리' })
  // @ApiResponse({
  //   status: 201,
  //   description: '예약 상태 처리 성공',
  //   type: checkReservationResDto,
  // })
  // @ApiBadRequestResponse({ description: '예약 상태 처리 실패' })
  // @ApiNotFoundResponse({ description: '해당 정보 보유 예약 없음' })
  // async checkReservations(
  //   @Body() dto: checkReservationReqDto,
  // ): Promise<checkReservationResDto> {
  //   return this.agencyService.checkReservations(dto);
  // }

  // @Get('getAgencyReservations')
  // @ApiOperation({ summary: '해당 판매점의 모든 예약 내역 조회' })
  // @ApiResponse({
  //   status: 201,
  //   description: '조회 성공',
  //   type: getAgencyReservationsResDto,
  // })
  // @ApiBadRequestResponse({ description: '조회 실패' })
  // @ApiNotFoundResponse({ description: '예약 없음' })
  // async getAgencyReservations(
  //   @Query() dto: getAgencyReservationsReqDto,
  // ): Promise<getAgencyReservationsResDto> {
  //   return this.agencyService.getAgencyReservations(dto);
  // }

  @Post('enrollSubsidy')
  @ApiBearerAuth()
  @ApiOperation({ summary: '공통지원금 등록' })
  @ApiResponse({
    status: 201,
    description: '등록 성공',
    type: enrollSubsidyResDto,
  })
  @ApiBadRequestResponse({ description: '등록 실패' })
  @ApiNotFoundResponse({ description: '이미 등록되있음' })
  @UseGuards(AuthGuard)
  async enrollSubsidy(
    @Body() dto: enrollSubsidyReqDto,
    @Req() req: Request,
  ): Promise<enrollSubsidyResDto> {
    const agency: payloadClass = req['agency'];
    return this.agencyService.enrollSubsidy(dto, agency);
  }

  @Get('getStatusAgency')
  @ApiBearerAuth()
  @ApiOperation({ summary: '견적 현황 조회' })
  @ApiResponse({
    status: 201,
    description: '조회 성공',
    type: getStatusAgencyResDto,
  })
  @ApiBadRequestResponse({ description: '조회 실패' })
  @ApiNotFoundResponse({ description: '없음' })
  @UseGuards(AuthGuard)
  getStatusAgency(
    @Query() dto: getStatusAgencyReqDto,
    @Req() req: Request,
  ): Promise<getStatusAgencyResDto> {
    const agency: payloadClass = req['agency'];
    return this.agencyService.getStatusAgency(dto, agency);
  }

  @Get('getStatusQuote')
  @ApiBearerAuth()
  @ApiOperation({ summary: '발급 견적 현황 조회' })
  @ApiResponse({
    status: 201,
    description: '조회 성공',
    type: getStatusAgencyResDto,
  })
  @ApiBadRequestResponse({ description: '조회 실패' })
  @ApiNotFoundResponse({ description: '없음' })
  @UseGuards(AuthGuard)
  getStatusQuote(
    @Query() dto: getStatusQuoteReqDto,
    @Req() req: Request,
  ): Promise<getStatusQuoteResDto> {
    const agency: payloadClass = req['agency'];
    return this.agencyService.getStatusQuote(dto, agency);
  }

  @Get('getQuoteDetail')
  @ApiBearerAuth()
  @ApiOperation({ summary: '견적 상세 조회' })
  @ApiResponse({
    status: 201,
    description: '조회 성공',
    type: getQuoteDetailResDto,
  })
  @ApiBadRequestResponse({ description: '조회 실패' })
  @ApiNotFoundResponse({ description: '없음' })
  @UseGuards(AuthGuard)
  getQuoteDetail(
    @Query() dto: getQuoteDetailReqDto,
    @Req() req: Request,
  ): Promise<getQuoteDetailResDto> {
    const agency: payloadClass = req['agency'];
    return this.agencyService.getQuoteDetail(dto, agency);
  }

  @Get('getPriceListByPhone')
  @ApiBearerAuth()
  @ApiOperation({ summary: '기종에 따른 가격 리스트 조회' })
  @ApiResponse({
    status: 201,
    description: '조회 성공',
    type: getPriceListByPhoneResDto,
  })
  @ApiBadRequestResponse({ description: '조회 실패' })
  @ApiNotFoundResponse({ description: '없음' })
  @UseGuards(AuthGuard)
  getPriceListByPhone(
    @Query() dto: getPriceListByPhoneReqDto,
    @Req() req: Request,
  ): Promise<getPriceListByPhoneResDto> {
    const agency: payloadClass = req['agency'];
    return this.agencyService.getPriceListByPhone(dto, agency);
  }

  @Post('enrollPriceListDetail')
  @ApiBearerAuth()
  @ApiOperation({ summary: '가격 리스트 상세 등록' })
  @ApiResponse({
    status: 201,
    description: '조회 성공',
    type: enrollPriceListDetailResDto,
  })
  @ApiBadRequestResponse({ description: '등록 실패' })
  @ApiNotFoundResponse({ description: '없음' })
  @UseGuards(AuthGuard)
  enrollPriceListDetail(
    @Body() dto: enrollPriceListDetailReqDto,
    @Req() req: Request,
  ): Promise<enrollPriceListDetailResDto> {
    const agency: payloadClass = req['agency'];
    return this.agencyService.enrollPriceListDetail(dto, agency);
  }

  @Post('checkIsUserVisit')
  @ApiBearerAuth()
  @ApiOperation({ summary: '방문 여부 확인' })
  @ApiResponse({
    status: 201,
    description: '조회 성공',
    type: checkIsUserVisitResDto,
  })
  @ApiBadRequestResponse({ description: '확인 실패' })
  @ApiNotFoundResponse({ description: '없음' })
  @UseGuards(AuthGuard)
  checkIsUserVisit(
    @Body() dto: checkIsUserVisitReqDto,
    @Req() req: Request,
  ): Promise<checkIsUserVisitResDto> {
    const agency: payloadClass = req['agency'];
    return this.agencyService.checkIsUserVisit(dto, agency);
  }

  @Get('checkLogin')
  @ApiBearerAuth()
  @ApiOperation({ summary: '인증 확인' })
  @ApiResponse({
    status: 201,
    description: '인증 성공',
    type: checkLoginResDto,
  })
  @UseGuards(AuthGuard)
  checkLogin(
    @Body() dto: checkLoginReqDto,
    @Req() req: Request,
  ): Promise<checkLoginResDto> {
    const agency: payloadClass = req['agency'];
    return this.agencyService.checkLogin(dto, agency);
  }

  // @Get('pushDummyData')
  // pushDummyData(): any {
  //   return this.agencyService.pushDummyData();
  // }
}
