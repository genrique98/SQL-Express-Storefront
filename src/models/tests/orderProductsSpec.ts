import { OrderStore } from '../orders';
import { Order_product, Order_ProductsStore } from '../order_products'

const store = new Order_ProductsStore()
const orderStore = new OrderStore()

describe("OrderProduct Model", () => {

  it('should have a showCart method', () => {
    expect(store.showCart).toBeDefined();
  });

  it('should have an addProduct method', () => {
    expect(store.addProduct).toBeDefined();
  });

  it('addProduct method should add a product to order', async () => {
    const numOfProductsInCart = await (await store.showCart("1")).length;

    await orderStore.create({
      user_id: 1,
      status: 'active'
    });

    await store.addProduct({
      productId: 2,
      quantity: 1
    });

    const newNumOfProductsInCart = await (await store.showCart("1")).length;

    expect(newNumOfProductsInCart).toBe(numOfProductsInCart)
  });

  it('show method should return the products in order with id 1', async () => {
    const result = await store.showCart("1");
    // console.log(result)
    expect(result).toBeTruthy;
  });

});