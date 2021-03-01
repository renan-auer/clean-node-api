import request from 'supertest'
import app from '../config/app'

describe('BodyParser Middlware', () => {
  test('Should parser body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Renan' })
      .expect({ name: 'Renan' })
  })
})
