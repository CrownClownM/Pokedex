import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, map } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { GenerationQueryResponse, GenerationResponse, PokeDetailResponse, PokeResponse, TypeQueryResponse, TypeResponse } from '../interfaces/pokemon.interface';


@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getPokemons(length:number): Observable<PokeResponse>{
    const url = `${ this.baseUrl }/pokemon/?limit=${length}`;
    return this.http.get<PokeResponse>(url);
  }

/*   getPokemon(detail:string): Observable<PokeDetailResponse>{
    return this.http.get<PokeDetailResponse>(detail);
  } */

  getPokemon(pokemon:string): Observable<PokeDetailResponse>{
    const url = `${ this.baseUrl }/pokemon/${pokemon}`;
    return this.http.get<PokeDetailResponse>(url);
  }

  getTypes(): Observable<TypeResponse>{
    const url = `${ this.baseUrl }/type`;
    return this.http.get<TypeResponse>(url);
  }

  getGenerations(): Observable<GenerationResponse>{
    const url = `${ this.baseUrl }/generation`;
    return this.http.get<GenerationResponse>(url);
  }

  getPokemonGenerations(generation:string): Observable<GenerationQueryResponse>{
    const url = `${ this.baseUrl }/generation/${generation}`;
    return this.http.get<GenerationQueryResponse>(url);
  }

  getPokemonTypes(type:string): Observable<TypeQueryResponse>{
    const url = `${ this.baseUrl }/type/${type}`;
    return this.http.get<TypeQueryResponse>(url)
    /* .pipe(
      map((data:any) => data.map((item:any) => {
        console.log('Desde el servicio:',item);
        return item;
      })  // Modifica la respuesta aquí
    )
    ) */
  }

}
