import { Body, Controller, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/CreateUserDto";

@Controller('users')
export class UserController{

    constructor(private readonly userService: UserService){}

    @Post()
    async createUser(@Body('user') createUserDto: CreateUserDto):Promise<any>{
        return this.userService.createUser(createUserDto);
    }
}