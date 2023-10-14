import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.use(
    session({
      secret: process.env.SECRET,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 50000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}

bootstrap();
