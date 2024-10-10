import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';  

describe('Auth and Posts E2E Test', () => {
  let app: INestApplication;
  let accessToken: string;  
  let newUserId: string;  

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (POST) - Create a new user', async () => {
    const createUserDto = {
      email: 'newuser@gmail.com',
      password: 'password123',
      name: 'New User',
    };

    const response = await request(app.getHttpServer())
      .post('/users')  
      .send(createUserDto)
      .expect(201);

    newUserId = response.body.id; 
    expect(newUserId).toBeDefined(); 
  });

  it('/auth/login (POST) - Login and receive a JWT token', async () => {
    const loginDto = {
      email: 'newuser@gmail.com',
      password: 'password123',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/login')  
      .send(loginDto)
      .expect(201);

    accessToken = response.body.access_token; 
    expect(accessToken).toBeDefined();
  });

  it('/posts (GET) - Should return posts when authorized', () => {
    return request(app.getHttpServer())
      .get('/posts')  
      .set('Authorization', `Bearer ${accessToken}`)  
      .expect(200); 
  });

  it('/posts (GET) - Should return 401 Unauthorized without token', () => {
    return request(app.getHttpServer())
      .get('/posts') 
      .expect(401);  
  });

  it('/users/:id (DELETE) - Delete the new user', () => {
    return request(app.getHttpServer())
      .delete(`/users/${newUserId}`)  
      .set('Authorization', `Bearer ${accessToken}`) 
      .expect(200);  
  });

  afterAll(async () => {
    await app.close();
  });
});
