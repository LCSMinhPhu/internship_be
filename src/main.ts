import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Di chuyển đoạn code enableCors vào đây, sau khi 'app' đã được tạo
  app.enableCors({
    origin: 'http://localhost:3000', // FE port
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
