import { Injectable } from "@nestjs/common";

@Injectable()
export class ArticleService {
    getAll(){
        return 'all articles';
    }
}