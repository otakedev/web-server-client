import { Controller, Request, Post, UseGuards, Body, Get } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller()
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post('signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        const createdUser = await this.usersService.create(createUserDto);
        return this.authService.login({ username: createdUser.username, _id: createdUser._id});
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Post('login-with-token')
    async loginWithToken(@Request() req) {
        return this.authService.login(req.user);
    }
}