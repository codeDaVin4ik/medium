import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUserDto";
import { UserEntity } from "./user.entity";
import { UserResponceIterface } from "./types/userRespoce.interface";
import { LoginUserDto } from "./dto/LoginUserDto";

@Controller('users')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto):Promise<UserResponceIterface>{
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponce(user);
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    async login(@Body('user') loginUserDto: LoginUserDto):Promise<UserResponceIterface>{
        const user = await this.userService.login(loginUserDto);
        return this.userService.buildUserResponce(user);
    }
}