import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
imports: [UsersModule, AuthModule, ProductsModule, CartModule, MongooseModule.forRoot('mongodb://root:example@localhost:27017/shopping_cart?authSource=admin')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
