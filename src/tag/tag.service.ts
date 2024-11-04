import { Injectable } from "@nestjs/common";

@Injectable()
export class TagService{
    fiindAll(){
        return ['coffee', 'dragons', 'service'];
    }
}