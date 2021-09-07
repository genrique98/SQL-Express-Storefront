import { Order, OrderStore } from '../orders';

const store = new OrderStore()

describe("Order Model", () => {

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should create an order', async () => {
    const numOfOrders = await (await store.index()).length;

    await store.create({
        user_id: 1,
        status: 'active'
    });

    const newNumOfOrders = await (await store.index()).length;

    expect(newNumOfOrders).toBe(numOfOrders + 1)
  });

  it('show method should return the order with id 1', async () => {
    await store.create({
      user_id: 1,
      status: 'active'
    });

    const result = await store.show("1");
    expect(result).toBeTruthy
  });

});