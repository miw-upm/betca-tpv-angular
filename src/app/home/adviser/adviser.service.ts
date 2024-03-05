import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from "../../shop/shared/services/models/article.model";
import {EndPoints} from "@shared/end-points";

@Injectable({
  providedIn: 'root',
})
export class AdviserService {
  constructor(private http: HttpClient) {}

  findArticlesByTagName(tagName: string): Observable<Article[]> {
    const url = `${EndPoints.TAGS}/${tagName}/articles`;
    return this.http.get<Article[]>(url);
  }
}
