import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

type AuthInput ={ email: string; password: string };
type AuthOutput = { email: string , id: string };
type AuthToken = { token: string, email: string , id: string };

@Injectable()
export class AuthService {
    // Injecting UsersService to access user data
    constructor(private usersService: UsersService) {}

    async authenticate(input: AuthInput): Promise<AuthToken> {
        const user = await this.validateUser(input);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials'); 
        }
        return { token: 'dummy-token', email: user.email, id: user.id };

    }

    async validateUser(input: AuthInput): Promise<AuthOutput | null> {
        const user = await this.usersService.findUserByEmail(input.email);

        if (user && user.password == input.password){
            return {
                email: user.email,
                id: user.id
            };
        }

        return null; // Placeholder for actual user validation logic
    }

    async createUser(input: AuthInput): Promise<AuthOutput> {
        const newUser = await this.usersService.createUser(input.email, input.password);
        return this.authenticate(newUser)
    }
}
