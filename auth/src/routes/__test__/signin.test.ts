import request from 'supertest'
import { app } from '../../app'

const route = '/api/users/signin'

it('fails when a non-existing email is supplied', async () => {
    await request(app)
      .post(route)
      .send({
        email: 'test@test.com',
        password: 'password'
    })
      .expect(400)
})

it('fails when an incorrect password is supplied', async () => {
    await request(app)
     .post('/api/users/signup')
     .send({
        email: 'test@test.com',
        password: 'password'
    })
     .expect(201)
 
     await request(app)
       .post(route)
       .send({
           email: 'test@test.com',
           password: 'jfjlkjs'
       })
       .expect(400)
})

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
     .post('/api/users/signup')
     .send({
        email: 'test@test.com',
        password: 'password'
    })
     .expect(201)
 
     const response = await request(app)
       .post(route)
       .send({
           email: 'test@test.com',
           password: 'password'
       })
       .expect(200)

       expect(response.get('Set-Cookie')).toBeDefined()
})