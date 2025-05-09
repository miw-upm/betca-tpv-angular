import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '@core/services/http.service';
import { EndPoints } from '@core/end-points';
import { Article } from '../shared/models/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  static readonly SEARCH = '/search';
  static readonly BY_TAGS = '/by-tags';
  static readonly SALE = '/sale';
  constructor(private readonly httpService: HttpService) {}

  // Create an article
  create(article: Article): Observable<Article> {
    return this.httpService.post(EndPoints.ARTICLES, article);
  }

  // Fetch articles for Sale (updated to use the SALE constant)
// In ArticleService
getSaleArticles(): Observable<any> {
  return this.httpService.get(EndPoints.ARTICLES + ArticleService.SALE);
}

  // Fetch article by id
  read(id: string): Observable<Article> {
    return this.httpService.get(EndPoints.ARTICLES + '/' + id);
  }

  // Update an article
  update(article: Article): Observable<Article> {
    return this.httpService.put(EndPoints.ARTICLES + '/' + article.id, article);
  }

  // Delete an article
  delete(id: string): Observable<void> {
    return this.httpService.delete(EndPoints.ARTICLES + '/' + id);
  }

  // Search articles based on a query
  search(query?: any): Observable<Article[]> {
    return this.httpService.get(EndPoints.ARTICLES + ArticleService.SEARCH + this.createQueryString(query));
  }

  // Find articles by tags
  findByTags(tagIds: string[]): Observable<Article[]> {
    return this.httpService.get(EndPoints.ARTICLES + ArticleService.BY_TAGS + '?tags=' + tagIds.join(','));
  }

  // Helper method to create query strings
  private createQueryString(query?: any): string {
    if (!query) {
      return '';
    }
    return '?' + Object.entries(query)
      .filter(([_, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }
}
