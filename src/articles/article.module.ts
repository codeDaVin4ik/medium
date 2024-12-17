import { Module } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./articleService.service";

@Module({
    imports:[],
    controllers:[ArticleController],
    providers:[ArticleService]
})
export class ArticleModule{}