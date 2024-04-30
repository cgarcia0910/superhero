import { Observable } from "rxjs";
import { Superhero } from "../models/superhero";
import { InjectionToken } from "@angular/core";

export interface IModelSuperHeroDisplayer {
    addSuperhero(superhero: Superhero):Observable<boolean>;
    getSuperheroesList():Observable<Superhero[]>;
    updateSuperhero(currentSuperhero: Superhero, newSuperHero: Superhero):Observable<boolean>;
    removeSuperhero(superhero:Superhero):Observable<boolean>;
};

export const MODEL_SUPERHERO_DISPLAYER = new InjectionToken<IModelSuperHeroDisplayer>('IModelSuperHeroDisplayer');