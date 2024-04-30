import { HttpClient } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, of } from "rxjs";
import { IAdapterSuperheroJSON } from "./domain/ports/i-adapter-superhero-json";
import { Superhero } from "./domain/models/superhero";

@Injectable()
export class SuperheroJsonAdapterService implements IAdapterSuperheroJSON {
  private httpClient: HttpClient;
  constructor(private injector: Injector) {
    this.httpClient = injector.get(HttpClient);
  }
    getSuperheroJSONList(): Observable<Superhero[]> {
        return this.httpClient.get<Superhero[]>('./assets/wikipedia_marvel_data.json')
    }
}