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
const debug_1 = __importDefault(require("debug"));
const users_service_1 = __importDefault(require("../services/users.service"));
const log = (0, debug_1.default)('app:users-controller');
class UsersMiddleware {
    constructor() {
        this.usersService = new users_service_1.default();
        this.extractUserId = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.userId;
            next();
        });
        this.validateSameEmailDoesntExist = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.getUserByEmail(req.body.email);
            if (user) {
                res.status(400).send({ error: `User email already exists` });
            }
            else {
                next();
            }
        });
        this.validateSameEmailBelongToSameUser = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (res.locals.user.id === req.params.userId) {
                next();
            }
            else {
                res.status(400).send({ error: `Invalid email` });
            }
        });
        // Here we need to use an arrow function to bind `this` correctly
        this.validatePatchEmail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.email) {
                log('Validating email', req.body.email);
                this.validateSameEmailBelongToSameUser(req, res, next);
            }
            else {
                next();
            }
        });
        this.validateUserExists = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.readById(parseInt(req.params.userId));
            if (user) {
                res.locals.user = user;
                next();
            }
            else {
                res.status(404).send({
                    error: `User ${req.params.userId} not found`,
                });
            }
        });
        this.userCantChangePermission = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            if ('permissionFlags' in req.body &&
                req.body.permissionFlags !== res.locals.user.permissionFlags) {
                res.status(400).send({
                    errors: ['User cannot change permission flags'],
                });
            }
            else {
                next();
            }
        });
    }
}
exports.default = UsersMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3VzZXJzL21pZGRsZXdhcmUvdXNlcnMubWlkZGxld2FyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtEQUEwQjtBQUMxQiw4RUFBcUQ7QUFHckQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHNCQUFzQixDQUFDLENBQUM7QUFFM0QsTUFBTSxlQUFlO0lBQXJCO1FBQ0ksaUJBQVksR0FBRyxJQUFJLHVCQUFZLEVBQUUsQ0FBQztRQUVsQyxrQkFBYSxHQUFHLENBQU8sR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUM5RixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxJQUFJLEVBQUUsQ0FBQztRQUNYLENBQUMsQ0FBQSxDQUFBO1FBRUQsaUNBQTRCLEdBQUcsQ0FBTyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1lBQzdHLE1BQU0sSUFBSSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwRSxJQUFJLElBQUksRUFBRTtnQkFDTixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSwyQkFBMkIsRUFBRSxDQUFDLENBQUM7YUFDaEU7aUJBQU07Z0JBQ0gsSUFBSSxFQUFFLENBQUM7YUFDVjtRQUNMLENBQUMsQ0FBQSxDQUFBO1FBRUQsc0NBQWlDLEdBQUcsQ0FBTyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEIsRUFBRSxFQUFFO1lBRWxILElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUMxQyxJQUFJLEVBQUUsQ0FBQzthQUNWO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLGVBQWUsRUFBRSxDQUFDLENBQUM7YUFDcEQ7UUFDTCxDQUFDLENBQUEsQ0FBQTtRQUVELGlFQUFpRTtRQUNqRSx1QkFBa0IsR0FBRyxDQUFPLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQixFQUFFLEVBQUU7WUFDbkcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDaEIsR0FBRyxDQUFDLGtCQUFrQixFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBRXhDLElBQUksQ0FBQyxpQ0FBaUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzFEO2lCQUFNO2dCQUNILElBQUksRUFBRSxDQUFDO2FBQ1Y7UUFDTCxDQUFDLENBQUEsQ0FBQztRQUVGLHVCQUFrQixHQUFHLENBQU8sR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUNuRyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDM0UsSUFBSSxJQUFJLEVBQUU7Z0JBQ04sR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUN2QixJQUFJLEVBQUUsQ0FBQzthQUNWO2lCQUFNO2dCQUNILEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixLQUFLLEVBQUUsUUFBUSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sWUFBWTtpQkFDL0MsQ0FBQyxDQUFDO2FBQ047UUFDTCxDQUFDLENBQUEsQ0FBQTtRQUVELDZCQUF3QixHQUFHLENBQU8sR0FBb0IsRUFBRSxHQUFxQixFQUFFLElBQTBCLEVBQUUsRUFBRTtZQUN6RyxJQUNJLGlCQUFpQixJQUFJLEdBQUcsQ0FBQyxJQUFJO2dCQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLGVBQWUsS0FBSyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQzlEO2dCQUNFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUNqQixNQUFNLEVBQUUsQ0FBQyxxQ0FBcUMsQ0FBQztpQkFDbEQsQ0FBQyxDQUFDO2FBQ047aUJBQU07Z0JBQ0gsSUFBSSxFQUFFLENBQUM7YUFDVjtRQUNMLENBQUMsQ0FBQSxDQUFBO0lBQ0wsQ0FBQztDQUFBO0FBRUQsa0JBQWUsZUFBZSxDQUFDIn0=