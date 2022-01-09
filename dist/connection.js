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
exports.connection = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const dotenvResult = dotenv_1.default.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const typeorm_1 = require("typeorm");
const connection = {
    create() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.createConnection)();
            console.log("Connected to the db");
        });
    },
    createTestConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.createConnection)({
                type: "postgres",
                host: "localhost",
                port: 5433,
                username: "postgres",
                password: "dragondeath",
                database: "my-shop-tycoon-dev",
                synchronize: true,
                logging: false,
                entities: [
                    "entity/**/*.entity.ts"
                ],
                migrations: [
                    "migration/*.ts"
                ],
                subscribers: [
                    "subscriber/*.ts"
                ]
            });
            console.log("Connected to the TEST db");
        });
    },
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, typeorm_1.getConnection)().close();
        });
    }
};
exports.connection = connection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2Nvbm5lY3Rpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLE1BQU0sWUFBWSxHQUFHLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDckMsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFO0lBQ3BCLE1BQU0sWUFBWSxDQUFDLEtBQUssQ0FBQztDQUM1QjtBQUNELHFDQUEwRDtBQUUxRCxNQUFNLFVBQVUsR0FBRztJQUNULE1BQU07O1lBQ1IsTUFBTSxJQUFBLDBCQUFnQixHQUFFLENBQUM7WUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7S0FBQTtJQUVLLG9CQUFvQjs7WUFDdEIsTUFBTSxJQUFBLDBCQUFnQixFQUFDO2dCQUNuQixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLElBQUksRUFBRSxJQUFJO2dCQUNWLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLG9CQUFvQjtnQkFDOUIsV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFFBQVEsRUFBRTtvQkFDTix1QkFBdUI7aUJBQzFCO2dCQUNELFVBQVUsRUFBRTtvQkFDUixnQkFBZ0I7aUJBQ25CO2dCQUNELFdBQVcsRUFBRTtvQkFDVCxpQkFBaUI7aUJBQ3BCO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQUVLLEtBQUs7O1lBQ1AsTUFBTSxJQUFBLHVCQUFhLEdBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNsQyxDQUFDO0tBQUE7Q0FDSixDQUFBO0FBRVEsZ0NBQVUifQ==