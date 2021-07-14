import { Order, OrderStore, Order_product } from '../orders';

const store = new OrderStore()

describe("User Model", () => {

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
    const newOrder = await store.create({
        user_id: 1
      });
    const order: Order = {
        id: 1,
        user_id: 1,
        status: 'active'
    };

    expect(newOrder).toContain(order)
  });

  it('show method should return the correct order', async () => {
    const result = await store.show("1");
    expect(result).toEqual(result)
  });

  it('addProduct method should add a product to order', async () => {
    const newOrderProduct = await store.addProduct({
      quantity: 1,
      orderId: 1,
      productId: 1
    });
    const orderProduct: Order_product = {
        id: 1,
        quantity: 1,
        orderId: 1,
        productId: 1
    };

    expect(newOrderProduct).toContain(orderProduct);
  });
  
});