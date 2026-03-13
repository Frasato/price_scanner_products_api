import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrecosModule } from './product.module';
import { IpService } from './services/ip.service';
import { IpController } from './controllers/ip.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '192.168.152.251',
      port: 5432,
      username: 'leitura_06052025',
      password: 's8gh5CVfjQ9pdTz',
      database: 'multidrogasshalom_loja01_20250212',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    PrecosModule,
  ],
  providers: [IpService],
  controllers: [IpController]
})
export class AppModule {}