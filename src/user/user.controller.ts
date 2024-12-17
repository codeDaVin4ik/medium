import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUserDto";
import { UserResponceIterface } from "./types/userRespoce.interface";
import { LoginUserDto } from "./dto/LoginUserDto";
import { User } from "./decorators/userDecorator";
import { UserEntity } from "./user.entity";
import { AuthGuard } from "./guards/userGuard";
import { UpdateUserDto } from "./dto/UpdateUserDto";

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

    @Get('/user')
    @UseGuards(AuthGuard)
    getUser(@User() user: UserEntity):Promise<UserResponceIterface>{
        return this.userService.buildUserResponce(user);
    }

    @Get()
    getAllUsers():Promise<UserEntity[]>{
        return this.userService.getAll();
    }

    @Put('/user')
    @UseGuards(AuthGuard)
    async updateUser(@User() user: UserEntity, @Body('user') updateUserDto: UpdateUserDto):Promise<UserResponceIterface>{
    return await this.userService.buildUserResponce(await this.userService.updateUser(user, updateUserDto))
    }
}