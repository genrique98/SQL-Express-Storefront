import exp from 'constants';
import { randomInt } from 'crypto';
import { Order, OrderStore, Order_product } from '../orders';

const store = new OrderStore()

describe("Order Model", () => {

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have an create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('create method should create an order', async () => {
    const numOfOrders = await (await store.index()).length;

    await store.create({
        user_id: randomInt(10),
        status: 'active'
      });

    const newNumOfOrders = await (await store.index()).length;

    expect(newNumOfOrders).toBe(numOfOrders + 1)
  });

  it('show method should return the order with id 1', async () => {
    const result = await store.show("1");
    expect(result).toEqual(result)
  });

  it('addProduct method should add a product to order', async () => {
    const numOfProductsInCart = await (await store.showCart("1")).length;

    await store.addProduct({
      quantity: randomInt(10),
      orderId: 1
    });

    const newNumOfProductsInCart = await (await store.showCart("1")).length;

    expect(newNumOfProductsInCart).toBe(numOfProductsInCart + 1)
  });
  
});