import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER ,
      password: process.env.DB_PASS ,
      database: process.env.DB_NAME ,

      autoLoadEntities: true,
      synchronize: true,
      logging: true,

      ssl: {
        rejectUnauthorized: false,
      },
    }),

    OrderModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
