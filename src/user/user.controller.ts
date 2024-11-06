import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUserDto";
import { UserEntity } from "./user.entity";
import { UserResponceIterface } from "./types/userRespoce.interface";

@Controller('users')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Post()
    @UsePipes(new ValidationPipe())
    async createUser(@Body('user') createUserDto: CreateUserDto):Promise<UserResponceIterface>{
        const user = await this.userService.createUser(createUserDto);
        return this.userService.buildUserResponce(user);
    }
}