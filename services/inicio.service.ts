import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { DadosDeConexao } from '../src/app/modelos/dadosDeConexao';
import { Usuario } from '../src/app/modelos/usuario';
import { Empresa } from '../src/app/modelos/empresa';
import { Menu } from '../src/app/modelos/menu';


@Injectable({
  providedIn: 'root'
})

export class InicioService {
  public FuncionalidadeSelecionada: any;
  //Base url
  @Inject('BASE_URL') baseurl: string;
  constructor(private http: HttpClient) { }

  //Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  ValideConexao(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('Inicio/ValideConexao', JSON.stringify(usuario), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
  }
  RetorneDadosUsuario(usuario: Usuario): Observable<Usuario> {

    return this.http.post<Usuario>('Inicio/RetorneDadosUsuario', JSON.stringify(usuario), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
  }
  RetorneEmpresasPorUsuario(usuario: Usuario): Observable<[Empresa]> {

    return this.http.post<[Empresa]>('Inicio/RetorneEmpresasPorUsuario', JSON.stringify(usuario), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
  }
  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => { resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude }); },
        err => {
          reject(err);
        });
    });
  }
  RetornaFuncionalidades(): Observable<[Menu]> {
    return this.http.get<[Menu]>('Inicio/RetornaFuncionalidade', this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
  }
  //Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    }
    else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
