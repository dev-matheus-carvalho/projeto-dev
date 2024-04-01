import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { ICriarContaReq,} from '../models/conta/ICriarContaReq';
import { apiUrl } from '../../constants/enviroment';
import { IHttpResponse } from '../models/IHttpResponse';
import { ILoginReq } from '../models/conta/ILoginReq';

@Injectable({
  providedIn: 'root'
})
export class ContaService {

  constructor(private http: HttpClient) { }

  public async criarConta(pBody: ICriarContaReq): Promise<IHttpResponse> {
    const retornoHttp = this.http.post<IHttpResponse>(`${apiUrl}/conta`, pBody).pipe();
    const dados = await lastValueFrom(retornoHttp);
    return dados;
  }

  public async login(pBody: ILoginReq): Promise<IHttpResponse> {
    const retornoHttp = this.http.post<IHttpResponse>(`${apiUrl}/login`, pBody).pipe();
    const dados = await lastValueFrom(retornoHttp);
    return dados;
  }


}
