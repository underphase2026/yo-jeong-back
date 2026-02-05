import { forwardRef, Module } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { AgencyController } from './agency.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from 'src/entity/Agency.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Rate } from 'src/entity/Rate.entity';
import { Phone } from 'src/entity/Phone.entity';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Seller } from 'src/entity/Seller.entity';
import { Telecom } from 'src/entity/Telecom.entity';
import { Brand } from 'src/entity/Brand.entity';
import { SubsidyByTelecom } from 'src/entity/SubsidyByTelecom.entity';
import { StatusAgency } from 'src/entity/StatusAgency.entity';
import { Estimate } from 'src/entity/Estimate.entity';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { AdditionalDiscount } from 'src/entity/AdditionalDiscount.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Agency,
      PriceList,
      Rate,
      Phone,
      Seller,
      Telecom,
      Brand,
      Rate,
      SubsidyByTelecom,
      StatusAgency,
      Estimate,
      KakaoUser,
      AdditionalDiscount,
    ]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
    ConfigModule,
  ],
  providers: [
    AgencyService,
    {
      provide: 'AGENCY_CONFIG',
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        jwtSecret: config.get<string>('JWT_SECRET'),
        jwtExp: config.get<string>('JWT_EXPIRATION_TIME'),
      }),
    },
  ],
  exports: [AgencyService],
  controllers: [AgencyController],
})
export class AgencyModule {}
