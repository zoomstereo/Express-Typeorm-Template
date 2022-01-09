import express from 'express';
import UsersService from '../services/users.service';
import argon2 from 'argon2';
import debug from 'debug';
import { PatchUserDto } from '../dto/patch.user.dto';

const log: debug.IDebugger = debug('app:users-controller');

class UsersController {
    usersService: UsersService;

    constructor() {
        this.usersService = new UsersService();
    }

    listUsers = async (req: express.Request, res: express.Response) => {
        const users = await this.usersService.list(100, 0);
        res.status(200).send(users);
    }

    getUserById = async (req: express.Request, res: express.Response) => {
        const user = await this.usersService.readById(req.body.id);
        res.status(200).send(user);
    }

    createUser = async (req: express.Request, res: express.Response) => {
        req.body.password = await argon2.hash(req.body.password);
        const userId = await this.usersService.create(req.body);
        res.status(201).send({ id: userId });
    }

    patch = async (req: express.Request, res: express.Response) => {
        if (req.body.password) {
            req.body.password = await argon2.hash(req.body.password);
        }
        log(await this.usersService.patchById(req.body.id, req.body));
        res.status(204).send();
    }

    put = async (req: express.Request, res: express.Response) => {        
        req.body.password = await argon2.hash(req.body.password);
        log(await this.usersService.putById(req.body.id, req.body));
        res.status(204).send();
    }

    removeUser = async (req: express.Request, res: express.Response) => {
        log(await this.usersService.deleteById(req.body.id));
        res.status(204).send();
    }

    updatePermissionFlags = async (req: express.Request, res: express.Response) => {
        const patchUserDto: PatchUserDto = {
            permissionFlags: parseInt(req.params.permissionFlags),
        };
        log(await this.usersService.patchById(req.body.id, patchUserDto));
        res.status(204).send();
    }
}

export default UsersController;