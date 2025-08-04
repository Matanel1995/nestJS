import { Injectable } from '@nestjs/common';
import { User } from './users.entity';


const users: User[] = [
    { id: '1', email: 'aaa@gmail.com', password: '123456' },
    { id: '2', email: 'bbb@gmail.com', password: '123456' }
];

@Injectable()
export class UsersService {
    async findUserByEmail(email: string): Promise<User | undefined> {
        return users.find(user => user.email === email);
    }

    async createUser(email: string, password: string): Promise<User> {
        const newUser: User = {
            id: (users.length + 1).toString(),
            email,
            password
        };
        users.push(newUser);
        return newUser;
    }
}
