import app from "../..";
import supertest from 'supertest';

const request = supertest(app);

describe("Order Endpoint", () => {
  let token: string = ''

  it('Creates an order', async () => {
    const authRes = await request.post('/auth').send(
        {
            username: 'testUser',
            password: 'password'
        }
    ).set('Accept', 'application/json');
    
    token = "Bearer " + authRes.body;

    const response = await request.post('/orders').send(
        {
            user_id: 1,
            status: 'active'
        }
    ).set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('Gets all orders', async () => {
    const response = await request.get('/orders').set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('Gets order with id', async () => {
    const response = await request.get('/orders/1').set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('Adds product to order', async () => {

    const response = await request.post('/orders/1/products').send(
        {
            product_id: 1,
            quantity: 2
        }
    ).set('Authorization', token);

    expect(response.status).toBe(200);
  });

  it('Gets current cart', async () => {
    const response = await request.get('/orders/users/1').set('Authorization', token);

    expect(response.status).toBe(200);
  });

});