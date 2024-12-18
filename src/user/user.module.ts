import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from './user.entity';
import { AuthGuard } from "./guards/userGuard";

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity])],
    controllers:[UserController],
    providers:[UserService, AuthGuard],
    exports:[UserService],
})
export class UserModule{}