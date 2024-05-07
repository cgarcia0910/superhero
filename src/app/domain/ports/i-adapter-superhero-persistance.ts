import { InjectionToken } from "@angular/core";
import { Superhero } from "../models/superhero";

export interface IAdapterSuperheroPersistance {
    createSuperHero(superhero:Superhero): void;
    updateSuperHero(previousValue: Superhero, currentValue: Superhero): void;
    deleteSuperHero(superhero:Superhero): void;
    getSuperHero(superheroList: Superhero[]): Superhero[];
}

export const ADAPTER_SUPERHERO_PERSISTANCE = new InjectionToken<IAdapterSuperheroPersistance>('IAdapterSuperheroPersistance');