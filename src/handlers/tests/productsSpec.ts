import app from "../..";
import supertest from 'supertest';

const request = supertest(app);

describe("Product Endpoint", () => {
  let token: string = ''

  it('Creates a product', async () => {
    const authRes = await request.post('/auth').send(
        {
            username: 'testUser',
            password: 'password'
        }
    ).set('Accept', 'application/json');
    
    token = "Bearer " + authRes.body;

    const response = await request.post('/products').send(
        {
            name: 'book',
            price: 10,
            category: 'fiction'
        }
    ).set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('Gets all products', async () => {
    const response = await request.get('/products').set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('Gets product with id', async () => {
    const response = await request.get('/products/1').set('Authorization', token);

    expect(response.status).toBe(200);
  });

});