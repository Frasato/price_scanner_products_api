import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IpService } from 'src/services/ip.service';

@Controller('ip')
export class IpController {
  constructor(private readonly ipService: IpService) {}

  @Post()
  create(@Body('ip') ip: string) {
    return this.ipService.setIp(ip);
  }

  @Get()
  listAll(){
    return this.ipService.getIpList();
  }
}