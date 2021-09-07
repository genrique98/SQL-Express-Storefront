import { OrderStore } from '../orders';
import { Order_product, Order_ProductsStore } from '../order_products'
import { ProductStore } from '../products';
import { UserStore } from '../users';

const store = new Order_ProductsStore()
const orderStore = new OrderStore()

describe("OrderProduct Model", () => {

  beforeAll( async () => {
    const userStore = new UserStore()
    await userStore.create({
      firstName: 'Dummy',
      lastName: 'User',
      username: 'dummyuser',
      password: '123456'
    });

    const productStore = new ProductStore()
    await productStore.create({
      name: 'book',
      price: 10,
      category: 'fiction'
    });
  })

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
      productId: 1,
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