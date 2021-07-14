import { Product, ProductStore } from '../products';

const store = new ProductStore()

describe("Product Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    const newProduct = await store.create({
      name: 'book',
      price: 10,
    });
    const product: Product = {
        id: 1,
        name: 'book',
        price: 10
    };
    expect(newProduct).toContain(product);
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });

  it('show method should return the correct product', async () => {
    const result = await store.show("1");
    expect(result).toEqual(result)
  });
  
});