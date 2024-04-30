import { Observable } from "rxjs";
import { Superhero } from "../models/superhero";
import { InjectionToken } from "@angular/core";

export interface IAdapterSuperheroJSON {
    getSuperheroJSONList():Observable<Superhero[]>;
}

export const ADAPTER_SUPERHERO_JSON = new InjectionToken<IAdapterSuperheroJSON>('IAdapterSuperheroJSON');