"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const express_validator_1 = require("express-validator");
const users_controller_1 = __importDefault(require("./controller/users.controller"));
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const common_routes_config_1 = require("../common/common.routes.config");
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const common_permission_middleware_1 = __importDefault(require("../common/middleware/common.permission.middleware"));
const users_middleware_1 = __importDefault(require("./middleware/users.middleware"));
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
        this.usersController = new users_controller_1.default();
        this.usersMiddleware = new users_middleware_1.default();
        this.jwtMiddleware = new jwt_middleware_1.default();
        this.configureRoutes();
    }
    configureRoutes() {
        this.app.route(`/users`)
            .get(
        // this.jwtMiddleware.validJWTNeeded,
        // PermissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
        this.usersController.listUsers)
            .post((0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password')
            .isLength({ min: 5 })
            .withMessage('Must include password (5+ characters)'), body_validation_middleware_1.default.verifyBodyFieldsErrors, this.usersMiddleware.validateSameEmailDoesntExist, this.usersController.createUser);
        this.app.param('userId', this.usersMiddleware.extractUserId);
        this.app.route('/users/:userId')
            .all(this.usersMiddleware.validateUserExists, this.jwtMiddleware.validJWTNeeded, common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction)
            .get(this.usersController.getUserById)
            .delete(this.usersController.removeUser);
        this.app.put('/users/:userId', [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            (0, express_validator_1.body)('permissionFlags').isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            this.usersMiddleware.validateSameEmailBelongToSameUser,
            this.usersMiddleware.userCantChangePermission,
            this.usersController.put
        ]);
        this.app.patch('/users/:userId', [
            (0, express_validator_1.body)('email').isEmail().optional(),
            (0, express_validator_1.body)('password')
                .isLength({ min: 5 })
                .withMessage('Password must be 5+ characters')
                .optional(),
            (0, express_validator_1.body)('firstName').isString().optional(),
            (0, express_validator_1.body)('lastName').isString().optional(),
            (0, express_validator_1.body)('permissionFlags').isInt().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            this.usersMiddleware.validatePatchEmail,
            this.usersMiddleware.userCantChangePermission,
            this.usersController.patch
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3VzZXJzL3VzZXJzLnJvdXRlcy5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EseURBQXlDO0FBQ3pDLHFGQUE0RDtBQUU1RCx1RkFBOEQ7QUFDOUQseUVBQW9FO0FBQ3BFLGlIQUF1RjtBQUN2RixxSEFBcUY7QUFFckYscUZBQTREO0FBRTVELE1BQWEsV0FBWSxTQUFRLHlDQUFrQjtJQUsvQyxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFMOUIsb0JBQWUsR0FBRyxJQUFJLDBCQUFlLEVBQUUsQ0FBQztRQUN4QyxvQkFBZSxHQUFHLElBQUksMEJBQWUsRUFBRSxDQUFDO1FBQ3hDLGtCQUFhLEdBQUcsSUFBSSx3QkFBYSxFQUFFLENBQUM7UUFLaEMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxlQUFlO1FBRVgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ25CLEdBQUc7UUFDQSxxQ0FBcUM7UUFDckMsZ0ZBQWdGO1FBQ2hGLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUNqQzthQUNBLElBQUksQ0FDRCxJQUFBLHdCQUFJLEVBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQ3ZCLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUM7YUFDWCxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDcEIsV0FBVyxDQUFDLHVDQUF1QyxDQUFDLEVBQ3pELG9DQUF3QixDQUFDLHNCQUFzQixFQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLDRCQUE0QixFQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FDbEMsQ0FBQztRQUVOLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTdELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQzNCLEdBQUcsQ0FDQSxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsRUFDakMsc0NBQW9CLENBQUMsa0NBQWtDLENBQzFEO2FBQ0EsR0FBRyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDO2FBQ3JDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTdDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQzNCLElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUU7WUFDdkIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQztpQkFDWCxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ3BCLFdBQVcsQ0FBQyx1Q0FBdUMsQ0FBQztZQUN6RCxJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQzVCLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBQSx3QkFBSSxFQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFO1lBQy9CLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLGlDQUFpQztZQUN0RCxJQUFJLENBQUMsZUFBZSxDQUFDLHdCQUF3QjtZQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUc7U0FDM0IsQ0FBQyxDQUFBO1FBRUYsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0IsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDO2lCQUNYLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDcEIsV0FBVyxDQUFDLGdDQUFnQyxDQUFDO2lCQUM3QyxRQUFRLEVBQUU7WUFDZixJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDdEMsSUFBQSx3QkFBSSxFQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQzFDLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQyxJQUFJLENBQUMsZUFBZSxDQUFDLGtCQUFrQjtZQUN2QyxJQUFJLENBQUMsZUFBZSxDQUFDLHdCQUF3QjtZQUM3QyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUs7U0FDN0IsQ0FBQyxDQUFBO1FBRUYsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQXZFRCxrQ0F1RUMifQ==