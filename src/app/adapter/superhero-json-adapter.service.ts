import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, map } from "rxjs";
import { IAdapterSuperheroJSON } from "./domain/ports/i-adapter-superhero-json";
import { Superhero } from "./domain/models/superhero";

@Injectable()
export class SuperheroJsonAdapterService implements IAdapterSuperheroJSON {
  private httpClient: HttpClient;
  constructor(private injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }
    private simpleHash(str: string) {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
      }
      return (hash >>> 0).toString(36).padStart(7, '0');
    };
    getSuperheroJSONList(): Observable<Superhero[]> {
        return this.httpClient.get<Superhero[]>('./assets/wikipedia_marvel_data.json').pipe(
          map(superheroList => superheroList.map(superhero => ({...superhero, id: this.simpleHash(JSON.stringify(superhero))}))),
        )
    }
}