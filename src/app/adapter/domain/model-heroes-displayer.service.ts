import { Inject, Injectable, inject } from "@angular/core";
import { BehaviorSubject, map, Observable, of, tap } from "rxjs";
import { Superhero } from "./models/superhero";
import { ADAPTER_SUPERHERO_JSON, IAdapterSuperheroJSON } from "./ports/i-adapter-superhero-json";
import { ADAPTER_SUPERHERO_PERSISTANCE, IAdapterSuperheroPersistance } from "./ports/i-adapter-superhero-persistance";
import { IModelSuperHeroDisplayer } from "./ports/i-model-displayer";

@Injectable()
export class ModelHeroesDisplayerService implements IModelSuperHeroDisplayer {
    private _adapterSuperheroJson = inject(ADAPTER_SUPERHERO_JSON);
    private _adapterSuperheroPersistance = inject(ADAPTER_SUPERHERO_PERSISTANCE);
    constructor(
        // @Inject('IAdapterSuperheroJSON') private _adapterSuperheroJson: IAdapterSuperheroJSON,
        // @Inject('IAdapterPersistance') private _adapterSuperheroPersistance: IAdapterSuperheroPersistance
    ) { }
    private _superHeroList: Superhero[] = [];
    addSuperhero(superhero: Superhero): Observable<boolean> {
        this._superHeroList.unshift(superhero);
        this._adapterSuperheroPersistance.createSuperHero(superhero);
        return of(true);
    }
    getSuperheroesList(): Observable<Superhero[]> {
        if (this._superHeroList.length > 0) {
            return of(this._superHeroList);
        }
        return this._adapterSuperheroJson.getSuperheroJSONList().pipe(
            map((superheroList: Superhero[]) => {
                this._superHeroList = this._adapterSuperheroPersistance.getSuperHero(superheroList);
                return this._superHeroList;
            })
        );
    }
    updateSuperhero(currentSuperhero: Superhero, newSuperHero: Superhero): Observable<boolean> {
        const modifiedSuperheroIndex = this._superHeroList.findIndex(sh => JSON.stringify(sh) === JSON.stringify(currentSuperhero));
        if (modifiedSuperheroIndex !== -1) {
            this._superHeroList[modifiedSuperheroIndex] = newSuperHero;
            this._adapterSuperheroPersistance.updateSuperHero(currentSuperhero, newSuperHero);
            return of(true);
        }
        return of(false);
    }
    removeSuperhero(superhero: Superhero): Observable<boolean> {
        this._superHeroList = this._superHeroList.filter(sh => JSON.stringify(sh) !== JSON.stringify(superhero));
        this._adapterSuperheroPersistance.deleteSuperHero(superhero);
        return of(true);
    }
}