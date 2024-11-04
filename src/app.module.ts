import { Module } from '@nestjs/common';
import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormconfig from 'ormconfig';
import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig as DataSourceOptions),TagModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
