import { ExpressRequest } from "@app/types/expressRequest";
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator((data: any, ctx: ExecutionContext)=>{
    const req = ctx.switchToHttp().getRequest() as ExpressRequest;
    if(!req.user){
        return null;
    }
    else if(data){
        return req.user[data]
    }
    else return req.user;
})