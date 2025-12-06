// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product/product.entity';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS — THIS IS THE MOST IMPORTANT LINE FOR VERCEL
  app.enableCors({
    origin: true,                
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Keep your clean /api prefix (exactly as in the assignment)
  app.setGlobalPrefix('api');

  // Swagger Documentation — available at /api/docs
  const config = new DocumentBuilder()
    .setTitle('E-Commerce Order Management API')
    .setDescription('Full Stack Coding Test — NestJS + React + PostgreSQL')
    .setVersion('1.0')
    .addTag('orders', 'Order CRUD operations')
    .addTag('products', 'Product catalog')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
    customSiteTitle: 'Order Management API Docs',
    customCss: '.swagger-ui .topbar { background-color: #1e293b; }',
  });

  // Listen on Vercel or local port
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger UI: ${await app.getUrl()}/api/docs`);

  // Seed the 4 required products on first startup
  try {
    const productRepository = app.get(getRepositoryToken(Product));
    const productCount = await productRepository.count();

    if (productCount === 0) {
      await productRepository.save([
        { id: 1, productName: 'HP laptop', productDescription: 'This is HP laptop' },
        { id: 2, productName: 'lenovo laptop', productDescription: 'This is lenovo' },
        { id: 3, productName: 'Car', productDescription: 'This is Car' },
        { id: 4, productName: 'Bike', productDescription: 'This is Bike' },
      ]);
      console.log('4 products seeded successfully');
    }
  } catch (error) {
    console.log('Product seeding skipped (already exists or DB not ready)');
  }
}

bootstrap();