import { JWT_TOKEN } from "@app/config";
import { ExpressRequest } from "@app/types/expressRequest";
import { UserService } from "@app/user/user.service";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Response } from "express";
import { verify } from 'jsonwebtoken';

@Injectable()
export class AuthMiddleware implements NestMiddleware{

    constructor(private readonly userService: UserService){}

    async use(req: ExpressRequest, res: Response, next: NextFunction) {
        if(!req.headers.authorization){
            req.user = null;
            next();
        }
        else {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const decoded = verify(token, JWT_TOKEN);
                req.user = await this.userService.findById(decoded['id']);
                next();
            } catch (error) {
                req.user = null;
                next();
            }
        }
    }
}