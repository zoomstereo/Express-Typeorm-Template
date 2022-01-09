"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const auth_controller_1 = __importDefault(require("./controller/auth.controller"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const jwt_middleware_1 = __importDefault(require("./middleware/jwt.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
class AuthRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'AuthRoutes');
        this.authMiddleware = new auth_middleware_1.default();
        this.jwtMiddleware = new jwt_middleware_1.default();
        this.authController = new auth_controller_1.default();
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.post(`/auth`, [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('password').isString(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            this.authMiddleware.verifyUserPassword,
            this.authController.createJWT,
        ]);
        this.app.post(`/auth/refresh-token`, [
            this.jwtMiddleware.validJWTNeeded,
            this.jwtMiddleware.verifyRefreshBodyField,
            this.jwtMiddleware.validRefreshNeeded,
            this.authController.createJWT,
        ]);
        return this.app;
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vYXV0aC9hdXRoLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUVBQW9FO0FBQ3BFLG1GQUEwRDtBQUMxRCxtRkFBMEQ7QUFDMUQsaUZBQXdEO0FBRXhELGlIQUF1RjtBQUN2Rix5REFBeUM7QUFHekMsTUFBYSxVQUFXLFNBQVEseUNBQWtCO0lBSzlDLFlBQVksR0FBd0I7UUFDaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztRQUw3QixtQkFBYyxHQUFHLElBQUkseUJBQWMsRUFBRSxDQUFDO1FBQ3RDLGtCQUFhLEdBQUcsSUFBSSx3QkFBYSxFQUFFLENBQUM7UUFDcEMsbUJBQWMsR0FBRyxJQUFJLHlCQUFjLEVBQUUsQ0FBQztRQUtsQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELGVBQWU7UUFFWCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzNCLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQyxJQUFJLENBQUMsY0FBYyxDQUFDLGtCQUFrQjtZQUN0QyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVM7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLEVBQUU7WUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjO1lBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsc0JBQXNCO1lBQ3pDLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCO1lBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUztTQUNoQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBOUJELGdDQThCQyJ9