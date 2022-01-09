"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_dao_1 = __importDefault(require("../daos/users.dao"));
class UsersService {
    constructor() {
        this.usersDao = new users_dao_1.default();
        this.create = (resource) => __awaiter(this, void 0, void 0, function* () {
            return this.usersDao.addUser(resource);
        });
        this.deleteById = (id) => __awaiter(this, void 0, void 0, function* () {
            return this.usersDao.removeUserById(id);
        });
        this.list = (limit, page) => __awaiter(this, void 0, void 0, function* () {
            return this.usersDao.getUsers();
        });
        this.putById = (id, resource) => __awaiter(this, void 0, void 0, function* () {
            return this.usersDao.putUserById(id, resource);
        });
        this.getUserByEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            return this.usersDao.getUserByEmail(email);
        });
        this.getUserByEmailWithPassword = (email) => __awaiter(this, void 0, void 0, function* () {
            return this.usersDao.getUserByEmailWithPassword(email);
        });
    }
    patchById(id, resource) {
        return this.usersDao.patchUserById(id, resource);
    }
    readById(id) {
        return this.usersDao.getUserById(id);
    }
}
exports.default = UsersService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL3NlcnZpY2VzL3VzZXJzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxrRUFBeUM7QUFNekMsTUFBTSxZQUFZO0lBQWxCO1FBQ0ksYUFBUSxHQUFHLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBRTFCLFdBQU0sR0FBRyxDQUFPLFFBQXVCLEVBQUUsRUFBRTtZQUN2QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQSxDQUFBO1FBRUQsZUFBVSxHQUFHLENBQU8sRUFBVSxFQUFFLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUEsQ0FBQTtRQUVELFNBQUksR0FBRyxDQUFPLEtBQWEsRUFBRSxJQUFZLEVBQUUsRUFBRTtZQUN6QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEMsQ0FBQyxDQUFBLENBQUE7UUFVRCxZQUFPLEdBQUcsQ0FBTyxFQUFVLEVBQUUsUUFBb0IsRUFBRSxFQUFFO1lBQ2pELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ25ELENBQUMsQ0FBQSxDQUFBO1FBRUQsbUJBQWMsR0FBRyxDQUFPLEtBQWEsRUFBRSxFQUFFO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDL0MsQ0FBQyxDQUFBLENBQUE7UUFFRCwrQkFBMEIsR0FBRyxDQUFPLEtBQWEsRUFBRSxFQUFFO1lBQ2pELE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxDQUFDLENBQUEsQ0FBQTtJQUNMLENBQUM7SUFuQkcsU0FBUyxDQUFDLEVBQVUsRUFBRSxRQUFzQjtRQUN4QyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRUQsUUFBUSxDQUFDLEVBQVU7UUFDZixPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FhSjtBQUVELGtCQUFlLFlBQVksQ0FBQyJ9