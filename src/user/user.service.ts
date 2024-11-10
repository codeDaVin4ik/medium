import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/CreateUserDto";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from './user.entity';
import { Repository } from "typeorm";
import { sign } from 'jsonwebtoken';
import { JWT_TOKEN } from "@app/config";
import { LoginUserDto } from "./dto/LoginUserDto";
import { compare } from 'bcrypt';

@Injectable()
export class UserService{
   
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){}

    async login(loginUserDto: LoginUserDto):Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                email: loginUserDto.email
            }
        })
        if(!user){
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        const isPasswordCorrect = await compare(loginUserDto.password, user.password);
        if(!isPasswordCorrect){
            throw new HttpException('Unauthorized: username or password  are incorrect', HttpStatus.UNAUTHORIZED)
        } 
        return user;
    }

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

    async getCurretUser(): Promise<any> {
            return 'current user';
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

    async findById(id: any) {
        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }
}