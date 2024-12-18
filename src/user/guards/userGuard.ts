import { ExpressRequest } from "@app/types/expressRequest";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest<ExpressRequest>();
        if(!req.user){
            throw new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
        }
        else return true;
    }
}