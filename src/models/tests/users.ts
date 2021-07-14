import { User, UserStore } from '../users';

const store = new UserStore()

describe("User Model", () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a book', async () => {
    const newUser = await store.create({
      firstName: 'Gabriel',
      lastName: 'Ramirez',
      username: 'gabrielr',
      password: '123'
    });
    const user: User = {
        id: 1,
        firstName: 'Gabriel',
        lastName: 'Ramirez',
        username: 'gabrielr',
        password: '123'
    };
    expect(newUser).toContain(user);
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toBeTruthy();
  });

  it('show method should return the correct user', async () => {
    const result = await store.show("1");
    expect(result).toEqual(result)
  });
  
});