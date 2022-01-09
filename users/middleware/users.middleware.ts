import express from 'express';
import debug from 'debug';
import UsersService from '../services/users.service';


const log: debug.IDebugger = debug('app:users-controller');

class UsersMiddleware {
    usersService = new UsersService();

    extractUserId = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        req.body.id = req.params.userId;
        next();
    }

    validateSameEmailDoesntExist = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const user = await this.usersService.getUserByEmail(req.body.email);
        if (user) {
            res.status(400).send({ error: `User email already exists` });
        } else {
            next();
        }
    }

    validateSameEmailBelongToSameUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {                
        if (res.locals.user.id === Number(req.params.userId)) {
            next();
        } else {
            res.status(400).send({ error: `Invalid email` });
        }
    }
    
    validatePatchEmail = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.email) {
            log('Validating email', req.body.email);

            this.validateSameEmailBelongToSameUser(req, res, next);
        } else {
            next();
        }
    };

    validateUserExists = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        let userId = Number(req.params.userId);

        if(isNaN(userId)) {
            res.status(404).send({
                error: `${req.params.userId} is not a valid ID`,
            });
            return;
        }

        const user = await this.usersService.readById(parseInt(req.params.userId));
        if (user) {
            res.locals.user = user;
            next();
        } else {
            res.status(404).send({
                error: `User ${req.params.userId} not found`,
            });
        }
    }

    userCantChangePermission = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (
            'permissionFlags' in req.body &&
            req.body.permissionFlags !== res.locals.user.permissionFlags
        ) {
            res.status(400).send({
                errors: ['User cannot change permission flags']
            });
        } else {
            next();
        }
    }
}

export default UsersMiddleware;