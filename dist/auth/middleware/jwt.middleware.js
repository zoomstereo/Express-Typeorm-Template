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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const users_service_1 = __importDefault(require("../../users/services/users.service"));
// @ts-expect-error
const jwtSecret = process.env.JWT_SECRET;
class JwtMiddleware {
    constructor() {
        this.usersService = new users_service_1.default();
    }
    verifyRefreshBodyField(req, res, next) {
        if (req.body && req.body.refreshToken) {
            return next();
        }
        else {
            return res
                .status(400)
                .send({ errors: ['Missing required field: refreshToken'] });
        }
    }
    validRefreshNeeded(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersService.getUserByEmailWithPassword(res.locals.jwt.email);
            const salt = crypto_1.default.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
            const hash = crypto_1.default
                .createHmac('sha512', salt)
                .update(res.locals.jwt.userId + jwtSecret)
                .digest('base64');
            if (hash === req.body.refreshToken) {
                req.body = {
                    userId: user._id,
                    email: user.email,
                    permissionFlags: user.permissionFlags,
                };
                return next();
            }
            else {
                return res.status(400).send({ errors: ['Invalid refresh token'] });
            }
        });
    }
    validJWTNeeded(req, res, next) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send('Unauthorized');
                }
                else {
                    res.locals.jwt = jsonwebtoken_1.default.verify(authorization[1], jwtSecret);
                    next();
                }
            }
            catch (err) {
                return res.status(403).send('Unauthorized');
            }
        }
        else {
            return res.status(401).send('Unauthorized');
        }
    }
}
exports.default = JwtMiddleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9hdXRoL21pZGRsZXdhcmUvand0Lm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnRUFBK0I7QUFDL0Isb0RBQTRCO0FBRTVCLHVGQUE4RDtBQUU5RCxtQkFBbUI7QUFDbkIsTUFBTSxTQUFTLEdBQVcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7QUFFakQsTUFBTSxhQUFhO0lBQW5CO1FBQ0ksaUJBQVksR0FBRyxJQUFJLHVCQUFZLEVBQUUsQ0FBQztJQXdEdEMsQ0FBQztJQXRERyxzQkFBc0IsQ0FBQyxHQUFvQixFQUFFLEdBQXFCLEVBQUUsSUFBMEI7UUFDMUYsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ25DLE9BQU8sSUFBSSxFQUFFLENBQUM7U0FDakI7YUFBTTtZQUNILE9BQU8sR0FBRztpQkFDTCxNQUFNLENBQUMsR0FBRyxDQUFDO2lCQUNYLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLHNDQUFzQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ25FO0lBQ0wsQ0FBQztJQUVLLGtCQUFrQixDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjs7WUFDNUYsTUFBTSxJQUFJLEdBQVEsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLDBCQUEwQixDQUNoRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQ3ZCLENBQUM7WUFDRixNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLGVBQWUsQ0FDL0IsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQzlDLENBQUM7WUFDRixNQUFNLElBQUksR0FBRyxnQkFBTTtpQkFDZCxVQUFVLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQztpQkFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7aUJBQ3pDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV0QixJQUFJLElBQUksS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtnQkFDaEMsR0FBRyxDQUFDLElBQUksR0FBRztvQkFDUCxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUc7b0JBQ2hCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztvQkFDakIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO2lCQUN4QyxDQUFDO2dCQUNGLE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDakI7aUJBQU07Z0JBQ0gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3RFO1FBQ0wsQ0FBQztLQUFBO0lBRUQsY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUIsRUFBRSxJQUEwQjtRQUNsRixJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7WUFDOUIsSUFBSTtnQkFDQSxNQUFNLGFBQWEsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUFFO29CQUMvQixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2lCQUMvQztxQkFBTTtvQkFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxzQkFBRyxDQUFDLE1BQU0sQ0FDdkIsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUNoQixTQUFTLENBQ0wsQ0FBQztvQkFDVCxJQUFJLEVBQUUsQ0FBQztpQkFDVjthQUNKO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1YsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzthQUMvQztTQUNKO2FBQU07WUFDSCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQztDQUNKO0FBRUQsa0JBQWUsYUFBYSxDQUFDIn0=