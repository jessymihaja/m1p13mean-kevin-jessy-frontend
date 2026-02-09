import { Component,OnInit } from '@angular/core';
import { Article } from '../../services/article';

@Component({
  selector: 'app-article-list',
  imports: [],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css',
})
export class ArticleList implements OnInit 
{
  articles: any[] = [];
  constructor(private articleService: Article) {}
  ngOnInit(): void {
    this.loadArticles();
  }
  loadArticles(): void {
    this.articleService.getArticles().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
  deleteArticle(articleId: string): void {
    this.articleService.deleteArticle(articleId).subscribe(
      () => {
        this.articles = this.articles.filter(article => article.id !== articleId);
      },
      (error) => {
        console.error('Error deleting article:', error);
      }
    );
  }

}