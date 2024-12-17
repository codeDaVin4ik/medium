import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./articleService.service";
import { AuthGuard } from "@app/user/guards/userGuard";
import { UserEntity } from "@app/user/user.entity";
import { CreateArticleDto } from "./dto/CreateArticleDto";
import { User } from "@app/user/decorators/userDecorator";

@Controller('/articles')
export class ArticleController{

    constructor(private readonly articleService: ArticleService){}

    @Get()
    getAll(){
        return this.articleService.getAll();
    }

    @Post()
    @UseGuards(AuthGuard)
    async create(@User() currentUser: UserEntity, @Body('article') createArticleDto: CreateArticleDto): Promise<any>{
        return await this.articleService.createArticle(currentUser, createArticleDto);
    }
}