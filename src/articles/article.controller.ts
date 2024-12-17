import { Controller, Get } from "@nestjs/common";
import { ArticleService } from "./articleService.service";

@Controller('/articles')
export class ArticleController{

    constructor(private readonly articleService: ArticleService){}

    @Get()
    getAll(){
        return this.articleService.getAll();
    }
}