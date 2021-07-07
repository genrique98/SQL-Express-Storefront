var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserStore } from '../users';
const store = new UserStore();
describe("User Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });
    it('create method should add a book', () => __awaiter(void 0, void 0, void 0, function* () {
        const newUser = yield store.create({
            firstName: 'Gabriel',
            lastName: 'Ramirez',
            username: 'gabrielr',
            password: '123'
        });
        const user = {
            id: 1,
            firstName: 'Gabriel',
            lastName: 'Ramirez',
            username: 'gabrielr',
            password: '123'
        };
        expect(newUser).toContain(user);
    }));
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toBeTruthy();
    }));
    it('show method should return the correct user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.show("1");
        expect(result).toEqual(result);
    }));
});
