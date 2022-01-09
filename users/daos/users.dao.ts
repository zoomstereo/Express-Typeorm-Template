import { getRepository, Repository } from "typeorm";
import { User } from "../../entity/user.entity";
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import debug from 'debug';

const log: debug.IDebugger = debug('app:in-memory-dao');

class UsersDao {
    userRepository = getRepository(User);

    constructor() {
        log('Created new instance of UsersDao');
    }

    async addUser(user: CreateUserDto) {
        user.permissionFlags = 1;
        const newUser = await this.userRepository.save({ ...user })
        return newUser.id;
    }

    async getUsers() {
        return this.userRepository.find({ take: 10 });
    }

    async getUserById(userId: number) {
        return this.userRepository.findOne({ where: { id: userId } })
    }

    async getUserByEmail(email: string) {
        return await this.userRepository.findOne({ where: { email: email } })
    }

    async getUserByEmailWithPassword(email: string) {
        return this.userRepository.findOne({
            where: { email: email },
            select: ['id', 'email', 'password', 'permissionFlags']
        })
    }

    async putUserById(userId: number, user: PutUserDto) {
        this.userRepository.update(userId, { ...user })
        return `${userId} updated via put`;
    }

    async patchUserById(userId: number, user: PatchUserDto) {
        this.userRepository.update(userId, { ...user });
        return `${userId} patched`;
    }

    async removeUserById(userId: number) {
        this.userRepository.delete(userId);
        return `${userId} removed`;
    }
}

export default UsersDao;