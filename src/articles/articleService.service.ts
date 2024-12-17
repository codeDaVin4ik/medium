import { UserEntity } from "@app/user/user.entity";
import { Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/CreateArticleDto";
import { InjectRepository } from "@nestjs/typeorm";
import { ArticleEntity } from "./article.entity";
import { Repository } from "typeorm";

@Injectable()
export class ArticleService {

    constructor(@InjectRepository(ArticleEntity) private readonly articleRepository: Repository<ArticleEntity>){}

    async createArticle(currentUser: UserEntity, createArticleDto: CreateArticleDto): Promise<any> {
        const article = new ArticleEntity();
        Object.assign(article, createArticleDto);
        if(!article.taglist){
            article.taglist = [];
        }
        article.slug = 'foo'
        article.author = currentUser;
        return await this.articleRepository.save(article)
    }
    getAll(){
        return 'all articles';
    }
}