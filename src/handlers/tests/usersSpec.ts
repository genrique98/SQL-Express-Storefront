import app from "../..";
import supertest from 'supertest';

const request = supertest(app);

describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
      const response = await request.get('/');
      expect(response.status).toBe(200);
    });
});

describe("User Endpoint", () => {
  let token: string = ''

  it('Creates a user', async () => {
    const response = await request.post('/users').send(
        {
            firstName: 'testName',
            lastName: 'testName',
            username: 'testUser',
            password: 'password'
        }
    ).set('Accept', 'application/json');
    
    token = "Bearer " + response.body;

    expect(response.status).toBe(200);
  });

  it('Authenticates user', async () => {
    const response = await request.post('/auth').send(
        {
            username: 'testUser',
            password: 'password'
        }
    ).set('Accept', 'application/json');

    expect(response.status).toBe(200);
  });

  it('Gets all users', async () => {
    const response = await request.get('/users').set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('Gets user with id', async () => {
    const response = await request.get('/users/1').set('Authorization', token);

    expect(response.status).toBe(200);
  });

});