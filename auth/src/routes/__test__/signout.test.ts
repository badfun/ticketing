import request from 'supertest'
import { app } from '../../app'

it('deletes the cookie after signing out', async () => {
    await request(app)
    .post('/api/users/signup')
    .send({
        email: 'test@test.com',
        password: 'password'
    })
    .expect(201)

    const response = await request(app)
      .post('/api/users/signout')
      .send({})
      .expect(200)

      // confirm the cookie is deleted by examing the header
      expect (response.get('Set-Cookie')[0]).toContain('express:sess=;')
})