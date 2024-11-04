import { Controller, Get } from "@nestjs/common";

@Controller('tags')
export class TagController{

    @Get()
    fiindAll(){
        return ['coffee', 'dragons'];
    }
}