import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

type AuthInput ={ email: string; password: string };
type AuthOutput = { email: string , id: string };


@Injectable()
export class AuthService {
    // Injecting UsersService to access user data
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService    
    ) {}

    async authenticate(input: AuthInput): Promise<{acces_token:string}> {
        const user = await this.validateUser(input);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials'); 
        }
        const payload = {sub: user.id, email: user.email};
        return {
            acces_token: await this.jwtService.signAsync(payload)
        };

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

    async createUser(input: AuthInput): Promise<{acces_token: string;}> {
        const newUser = await this.usersService.createUser(input.email, input.password);
        return this.authenticate(newUser)
    }
}
