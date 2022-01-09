import express from "express";
import { body } from "express-validator";
import UsersController from "./controller/users.controller";

import JwtMiddleware from "../auth/middleware/jwt.middleware";
import { CommonRoutesConfig } from "../common/common.routes.config";
import BodyValidationMiddleware from "../common/middleware/body.validation.middleware";
import PermissionMiddleware from "../common/middleware/common.permission.middleware";
import { PermissionFlag } from "../common/middleware/common.permissionflag.enum";
import UsersMiddleware from "./middleware/users.middleware";

export class UsersRoutes extends CommonRoutesConfig {
    usersController = new UsersController();
    usersMiddleware = new UsersMiddleware();
    jwtMiddleware = new JwtMiddleware();

    constructor(app: express.Application) {
        super(app, 'UsersRoutes');

        this.configureRoutes();
    }

    configureRoutes(): express.Application {

        this.app.route(`/users`)
            .get(
                this.jwtMiddleware.validJWTNeeded,
                PermissionMiddleware.permissionFlagRequired(PermissionFlag.ADMIN_PERMISSION),
                this.usersController.listUsers
            )
            .post(
                body('email').isEmail(),
                body('password')
                    .isLength({ min: 5 })
                    .withMessage('Must include password (5+ characters)'),
                BodyValidationMiddleware.verifyBodyFieldsErrors,
                this.usersMiddleware.validateSameEmailDoesntExist,
                this.usersController.createUser
            );

        this.app.param('userId', this.usersMiddleware.extractUserId);

        this.app.route('/users/:userId')
            .all(
                this.usersMiddleware.validateUserExists,
                this.jwtMiddleware.validJWTNeeded,
                PermissionMiddleware.onlySameUserOrAdminCanDoThisAction
            )
            .get(this.usersController.getUserById)
            .delete(this.usersController.removeUser);

        this.app.put('/users/:userId', [
            body('email').isEmail(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            this.usersMiddleware.validateSameEmailBelongToSameUser,
            this.usersMiddleware.userCantChangePermission,
            PermissionMiddleware.permissionFlagRequired(
                PermissionFlag.PAID_PERMISSION
            ),
            this.usersController.put
        ])

        this.app.patch('/users/:userId', [
            body('email').isEmail().optional(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Password must be 5+ characters')
                .optional(),
            body('firstName').isString().optional(),
            body('lastName').isString().optional(),
            body('permissionFlags').isInt().optional(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            this.usersMiddleware.validatePatchEmail,
            this.usersMiddleware.userCantChangePermission,
            PermissionMiddleware.permissionFlagRequired(PermissionFlag.PAID_PERMISSION),
            this.usersController.patch
        ])

        /**
         * This route does not currently require extra permissions.
         *
         * Please update it for admin usage in your own application!
         */
        this.app.put(`/users/:userId/permissionFlags/:permissionFlags`, [
            this.jwtMiddleware.validJWTNeeded,
            PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
            PermissionMiddleware.permissionFlagRequired(
                PermissionFlag.FREE_PERMISSION
            ),
            this.usersController.updatePermissionFlags,
        ]);

        return this.app;
    }
}