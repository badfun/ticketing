import request from 'supertest'
import { app } from '../../app'

const route = '/api/users/signup'

it('returns a 201 on successful signup', async () => {
  await request(app)
    .post(route)
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201)
})

it('returns a 400 with an invalid email', async () => {
    await request(app)
    .post(route)
    .send({
      email: 'test.com',
      password: 'password',
    })
    .expect(400)
})

it('returns a 400 with an invalid password', async () => {
    await request(app)
    .post(route)
    .send({
      email: 'test@test.com',
      password: 'p',
    })
    .expect(400)
})

it('returns a 400 with missing email and password', async () => {
    await request(app)
    .post(route)
    .send({
      email: 'test@test.com'
    })
    .expect(400)

    await request(app)
    .post(route)
    .send({
      password: 'password'
    })
    .expect(400)
})

it('disallows duplicate emails', async () => {
    await request(app)
      .post(route)
      .send({
          email: 'test@test.com',
          password: 'password'
      })
      .expect(201)

      await request(app)
        .post(route)
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400)
})

it('sets a cookie after successful signup', async () => {
    const response = await request(app)
      .post(route)
      .send({
          email: 'test@test.com',
          password: 'password'
      })

      expect(response.get('Set-Cookie')).toBeDefined()
})