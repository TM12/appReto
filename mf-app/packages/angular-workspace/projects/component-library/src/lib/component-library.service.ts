import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioType } from './types/usuario.type';
import { environment } from './environments/environment';
const { host } = environment;

@Injectable({
  providedIn: 'root'
})
export class ComponentLibraryService {

  headers = new HttpHeaders()
    .append('Content-Type', 'application/json')
    .append('Accept', 'application/json');

  constructor(private http: HttpClient) { }

  getListUser(route: string) {
    const uri = `${host}/${route}`;
    return this.http.get(uri, { headers: this.headers });
  }

  sendUser(route: string,user : UsuarioType) {
    const uri = `${host}/${route}`;
    if(user?.id)
      return this.http.put(`${uri}/${user.id}`, user, { headers: this.headers });
    else
      return this.http.post(uri, user, { headers: this.headers });
  }

  deleteUser(route: string, user : UsuarioType){
    const uri = `${host}/${route}`;
    return this.http.delete(`${uri}/${user.id}`, { headers: this.headers });
  }
}
