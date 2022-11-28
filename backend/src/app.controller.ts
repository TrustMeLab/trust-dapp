import { Controller, Headers, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { IsNotEmpty, IsNumber } from 'class-validator';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Trust = require('@theoutsiderslab/trust-nodejs-sdk');

class CreateOwnerDto {
  @IsNotEmpty()
  name: string;
}

class CreateLeaseDto {
  @IsNotEmpty()
  @IsNumber()
  tenantId: number;
  @IsNotEmpty()
  @IsNumber()
  rentAmount: number;
  @IsNotEmpty()
  @IsNumber()
  totalNumberOfRents: number;
  @IsNotEmpty()
  paymentToken: string;
  @IsNotEmpty()
  @IsNumber()
  rentPaymentInterval: number;
  @IsNotEmpty()
  @IsNumber()
  rentPaymentLimitTime: number;
  @IsNotEmpty()
  currencyPair: 'CRYPTO' | string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/init')
  init(@Headers() headers: Headers) {
    const API_KEY = headers['x-api-key'];
    const $trust = new Trust(API_KEY);
    return $trust.init();
  }

  @Post('/owner')
  createOwner(@Headers() headers: Headers, @Body() body: CreateOwnerDto) {
    const API_KEY = headers['x-api-key'];
    const $trust = new Trust(API_KEY);
    return $trust.createOwner(body.name);
  }

  @Post('/lease')
  createLease(@Headers() headers: Headers, @Body() body: CreateLeaseDto) {
    const API_KEY = headers['x-api-key'];
    const $trust = new Trust(API_KEY);
    return $trust.createLease(
      body.tenantId,
      body.rentAmount,
      body.totalNumberOfRents,
      body.paymentToken,
      body.rentPaymentInterval,
      body.rentPaymentLimitTime,
      body.currencyPair,
      new Date(),
    );
  }
}
