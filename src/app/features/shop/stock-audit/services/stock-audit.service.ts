import { Injectable } from '@angular/core';
import { EndPoints } from '@core/end-points';
import { HttpService } from '@core/services/http.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuditedArticle, StockAudit } from '../models/stock-audit.model';

@Injectable({
  providedIn: 'root'
})
export class StockAuditService {
  constructor(private readonly httpService: HttpService) { }
  
  findAll(): Observable<StockAudit[]> {
    return this.httpService.get(EndPoints.STOCK_AUDITS);
  }

  create(): Observable<void> {
    return this.httpService.post(EndPoints.STOCK_AUDITS);
  }

  read(id: string): Observable<StockAudit> {
    return this.httpService.get(EndPoints.STOCK_AUDITS + '/' + id);
  }

  update(id: string): Observable<void> {
    return this.httpService.put(EndPoints.STOCK_AUDITS + '/' + id);
  }

  updateAuditRealValues(id: string, articlesAudited: AuditedArticle[]): Observable<void> {
  return this.httpService.put(EndPoints.STOCK_AUDITS + '/' + id, {
    articlesAudited: Array.isArray(articlesAudited) ? articlesAudited : []
  });
}

 closeAudit(id: string): Observable<void> {
    return this.httpService.put(`${EndPoints.STOCK_AUDITS}/${id}/close`, null).pipe(
      catchError(error => {
        console.error('Error detallado:', error);
        // Personaliza el mensaje según el tipo de error
        if (error.status === 412) { // Precondition Failed
          return throwError(() => new Error('No se puede cerrar: ' + error.error.message));
        } else if (error.status === 0) {
          return throwError(() => new Error('Error de conexión con el servidor'));
        } else {
          return throwError(() => error); 
        }
      })
    );
  }
}