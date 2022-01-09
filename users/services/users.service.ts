import UsersDao from '../daos/users.dao';
import { CRUD } from '../../common/interfaces/crud.interface';
import { CreateUserDto } from '../dto/create.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';

class UsersService implements CRUD {
    usersDao = new UsersDao();

    create = async (resource: CreateUserDto) => {
        return this.usersDao.addUser(resource);
    }

    deleteById = async (id: number) => {
        return this.usersDao.removeUserById(id);
    }

    list = async (limit: number, page: number) => {
        return this.usersDao.getUsers();
    }

    patchById(id: number, resource: PatchUserDto) {
        return this.usersDao.patchUserById(id, resource);
    }

    readById(id: number) {
        return this.usersDao.getUserById(id);
    }

    putById = async (id: number, resource: PutUserDto) => {
        return this.usersDao.putUserById(id, resource);
    }

    getUserByEmail = async (email: string) => {
        return this.usersDao.getUserByEmail(email);
    }

    getUserByEmailWithPassword = async (email: string) => {
        return this.usersDao.getUserByEmailWithPassword(email);
    }
}

export default UsersService;