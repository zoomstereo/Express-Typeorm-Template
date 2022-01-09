"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:typeorm-service');
class TypeOrmService {
    constructor() {
        this.typeOrmOptions = {
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "admin",
            database: "test",
            entities: [
                __dirname + "/entity/*.js"
            ],
            synchronize: true,
            logging: false
        };
        this.connect = () => {
            log('Attempting Postgresql connection . . .');
        };
        this.connect();
    }
}
//export default new TypeOrmService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZW9ybS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL3NlcnZpY2VzL3R5cGVvcm0uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUNBLGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMscUJBQXFCLENBQUMsQ0FBQztBQUUxRCxNQUFNLGNBQWM7SUFlaEI7UUFkUSxtQkFBYyxHQUFHO1lBQ3JCLElBQUksRUFBRSxPQUFPO1lBQ2IsSUFBSSxFQUFFLFdBQVc7WUFDakIsSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUUsT0FBTztZQUNqQixRQUFRLEVBQUUsTUFBTTtZQUNoQixRQUFRLEVBQUU7Z0JBQ04sU0FBUyxHQUFHLGNBQWM7YUFDN0I7WUFDRCxXQUFXLEVBQUUsSUFBSTtZQUNqQixPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFBO1FBTUQsWUFBTyxHQUFHLEdBQUcsRUFBRTtZQUNYLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQTtRQUxHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUNuQixDQUFDO0NBT0o7QUFFRCxzQ0FBc0MifQ==