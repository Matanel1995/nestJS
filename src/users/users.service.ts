import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { Model } from 'mongoose';
import { User as UserSchema } from '../schemas/user.schema'
import { InjectModel } from '@nestjs/mongoose';


const users: User[] = [
    { id: '1', email: 'aaa@gmail.com', password: '123456' },
    { id: '2', email: 'bbb@gmail.com', password: '123456' }
];

@Injectable()
export class UsersService {
    constructor(@InjectModel(UserSchema.name) private userModel: Model<UserSchema>){

    }


    async findUserByEmail(email: string): Promise<User | undefined> {
        return users.find(user => user.email === email);
    }

    async createUser(email: string, password: string): Promise<User> {
        const newUser: User = {
            id: (users.length + 1).toString(),
            email,
            password
        };
        const db_user = new this.userModel(newUser);
        console.log(db_user)
        await db_user.save();

        users.push(newUser);
        return newUser;
    }
}
