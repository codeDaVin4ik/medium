import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/CreateUserDto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from './user.entity';
import { Repository } from "typeorm";
import { sign } from 'jsonwebtoken';
import { JWT_TOKEN } from "@app/config";

@Injectable()
export class UserService{

    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

    async createUser(createUserDto: CreateUserDto):Promise<UserEntity> {
        const userByName = await this.userRepository.findOne({
            where: {
                username: createUserDto.username
            }
        })
        const userByEmail = await this.userRepository.findOne({
            where: {
                email: createUserDto.email
            }
        })
        if(userByName || userByEmail){
            throw new HttpException('Username or email are taken', HttpStatus.UNPROCESSABLE_ENTITY)
        }
        const newUser = new UserEntity();
        Object.assign(newUser, createUserDto);
        return await this.userRepository.save(newUser);
    }

    buildUserResponce(user:UserEntity):any{
        return {
            user: {
                ...user,
                token: this.generateJwt(user)
            }
        }
    }
    generateJwt(user: UserEntity) {
        return sign({
            id: user.id,
            username: user.username,
            email: user.email
        }, JWT_TOKEN);
    }
}