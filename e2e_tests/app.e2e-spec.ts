import { USER_ID } from '@constants/user-ids.const'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'

import { AppModule } from '../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/POST/claim-free-share', () => {
    return request(app.getHttpServer()).post(`/claim-free-share/${USER_ID.USER_1}`).expect(201)
  })
})
