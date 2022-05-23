import { EntityRepository, Repository } from 'typeorm';
import { Article, Tag } from '@/article/entity';
import { CreateArticleDto, UpdateArticleDto } from '@/article/dto';

@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {
  async findAllArticles(): Promise<Article[]> {
    return await this.find({ order: { createdAt: 'DESC' } });
  }

  async findArticles(user, tag): Promise<Article[]> {
    const articles = this.createQueryBuilder('article')
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.tagList', 'tag')
      .where('article.fk_user_id = :id', { id: user.id });
    if (tag) {
      articles.andWhere('tag.name = :name', { name: tag });
    }
    return await articles.orderBy('article.createdAt', 'DESC').getMany();
  }

  async findArticleById(id: number): Promise<Article> {
    const article = this.createQueryBuilder('article')
      .where('article.id = :id', { id })
      .leftJoinAndSelect('article.user', 'user')
      .leftJoinAndSelect('article.tagList', 'tag')
      .leftJoinAndSelect('article.comments', 'comments')
      .addOrderBy('comments.createdAt', 'DESC')
      .leftJoinAndSelect('comments.user', 'comment_user');
    return await article.getOne();
  }

  async createArticle(userId: number, dto: CreateArticleDto): Promise<Article> {
    const article = new Article();
    article.title = dto.title;
    article.description = dto.description;
    article.body = dto.body;
    article.fk_user_id = userId;

    return await this.save(article);
  }

  // async updateArticle(
  //   articleId: number,
  //   tagList: Tag[],
  //   dto: UpdateArticleDto,
  // ): Promise<void> {
  //   const article = await this.findArticleById(articleId);
  //   article.title = dto.title;
  //   article.description = dto.description;
  //   article.body = dto.body;
  //   article.tagList = tagList;
  //   await this.save(article);
  // }

  //TODO: tag가 같이 삭제되어야 하는데 ManyToMany만 삭제되고 태그가 삭제 안 됨
  async deleteArticle(articleId: number): Promise<void> {
    const article = await this.findArticleById(articleId);
    await this.remove(article);
  }
}
