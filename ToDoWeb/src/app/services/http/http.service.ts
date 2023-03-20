import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, finalize, Observable, ObservableInput, of, retryWhen, tap, timeout, TimeoutError } from 'rxjs';
import { ToDo } from '@models/ToDos/todo';
import { CreateUpdateToDoDTO } from '@models/ToDos/todo.dto';
import { APIResponse, MessageType } from '@services/http/http.types';
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private readonly _retryLimit: number;
  private readonly _retryCodes: number[];
  private readonly _takingLongSeconds: number;

  constructor(private httpClient: HttpClient,private _snackbar:MatSnackBar) 
  { 
    this._retryLimit = 2;
    this._retryCodes = [0, HttpStatusCode.BadGateway, HttpStatusCode.ServiceUnavailable, HttpStatusCode.GatewayTimeout];
    this._takingLongSeconds = 10;
  }

  public get(url: string): Observable<APIResponse<ToDo[]>> {
    const takingLong = this.setTakingLongTimeout();

    return this.httpClient.get<APIResponse<ToDo[]>>(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).pipe(
      timeout((this._takingLongSeconds / 2) * 3 * 1000),
      retryWhen(error => this.retryRequest(error)),
      catchError((error) => this.handleError(error)),
      finalize(() => { clearTimeout(takingLong) })
    )
  }
  public post(url: string, data: CreateUpdateToDoDTO = null): Observable<APIResponse<ToDo>> {
    return this.httpClient.post<APIResponse<ToDo>>(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public put(url: string, data: CreateUpdateToDoDTO = null): Observable<APIResponse<ToDo>> {
    return this.httpClient.put<APIResponse<ToDo>>(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  public delete(url: string): Observable<APIResponse<ToDo>> {
    return this.httpClient.delete<APIResponse<ToDo>>(url, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  private setTakingLongTimeout(): NodeJS.Timeout {
    return setTimeout(() => {
      this._snackbar.open('La acción está tardando, por favor espere...',"cerrar");
    }, this._takingLongSeconds * 1000);
  }

  private retryRequest(error: Observable<any>): Observable<any> {
    let retries = 0;
    let takingLong: NodeJS.Timeout[] = [];

    return error.pipe(
      tap(error => {
        if(retries > 0) {
          takingLong.push(this.setTakingLongTimeout());
        } 
        
        if(!(error instanceof HttpErrorResponse) || !this._retryCodes.includes(error.status) || ++retries > this._retryLimit) {
          throw error;
        }  
      }),
      delay((this._takingLongSeconds / 2) * 1000),
      finalize(() => { takingLong.forEach(clearTimeout); })
    );
  }

  private handleError(error: Error): ObservableInput<APIResponse<null>> {
    if(error instanceof HttpErrorResponse) {
      console.warn(`HttpService ${error.status}: ${JSON.stringify(error.error.data, null, 4)}`);
    
      if (error.status == 0) {
        this._snackbar.open('No se ha podido conectar al servidor.',"cerrar");
      } else {
        this._snackbar.open('Ha ocurrido un error inesperado del servidor.',"cerrar");
      }

      return of({ httpStatusCode: error.status , isSuccess: false, messages: [], data: null });
    } else if (error instanceof TimeoutError) {
      this._snackbar.open('No se ha podido conectar al servidor.',"cerrar");
    }

    console.warn(`HttpService: ${JSON.stringify(error.message, null, 4)}`);
    return of({ httpStatusCode: null, isSuccess: false, messages: [], data: null });
  }

}
