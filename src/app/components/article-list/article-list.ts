import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Article } from '../../services/article';

@Component({
  selector: 'app-article-list',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
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

  viewArticle(article: any): void {
    alert(`Voir article ${article.id}`);
  }

  addToCart(article: any): void {
    alert(`Ajouter au panier : ${article.id}`);
  }

}