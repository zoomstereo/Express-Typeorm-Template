import { CommonRoutesConfig } from '../common/common.routes.config';
import AuthController from './controller/auth.controller';
import AuthMiddleware from './middleware/auth.middleware';
import JwtMiddleware from './middleware/jwt.middleware';
import express from 'express';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import { body } from 'express-validator';


export class AuthRoutes extends CommonRoutesConfig {
    authMiddleware = new AuthMiddleware();
    jwtMiddleware = new JwtMiddleware();
    authController = new AuthController();    

    constructor(app: express.Application) {
        super(app, 'AuthRoutes');

        this.configureRoutes();
    }

    configureRoutes(): express.Application {
        
        this.app.post(`/auth`, [
            body('email').isEmail(),
            body('password').isString(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
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