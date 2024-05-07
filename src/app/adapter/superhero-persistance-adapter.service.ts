import { Injectable } from "@angular/core";
import { Superhero } from "../domain/models/superhero";
import { IAdapterSuperheroPersistance } from "../domain/ports/i-adapter-superhero-persistance";

@Injectable()
export class SuperheroPersistanceAdapterService implements IAdapterSuperheroPersistance {
    private _superheroLSKey = 'superHeroChanges';
    createSuperHero(superhero: Superhero): void {
        const actionList = localStorage.getItem(this._superheroLSKey) ? 
            JSON.parse(localStorage.getItem(this._superheroLSKey) || '') as unknown[] : [];
        actionList.push({action: 'add-superhero', value: superhero});
        localStorage.setItem(this._superheroLSKey, JSON.stringify(actionList));
    }
    updateSuperHero(previousValue: Superhero, currentValue: Superhero): void {
        const actionList = localStorage.getItem(this._superheroLSKey) ? 
            JSON.parse(localStorage.getItem(this._superheroLSKey) || '') as unknown[] : [];
        actionList.push({action: 'edit-superhero', value: {previousValue, currentValue}});
        localStorage.setItem(this._superheroLSKey, JSON.stringify(actionList));
    }
    deleteSuperHero(superhero: Superhero): void {
        const actionList = localStorage.getItem(this._superheroLSKey) ? 
            JSON.parse(localStorage.getItem(this._superheroLSKey) || '') as unknown[] : [];
        actionList.push({action: 'remove-superhero', value: superhero});
        localStorage.setItem(this._superheroLSKey, JSON.stringify(actionList));
    }
    getSuperHero(superheroList: Superhero[]): Superhero[] {
        const actionList = localStorage.getItem(this._superheroLSKey) ? 
            JSON.parse(localStorage.getItem(this._superheroLSKey) || '') as unknown[] : [];
        actionList.forEach((actionEntry) => {
            const {action = undefined, value = undefined} = (actionEntry || {}) as {action: string, value: unknown};
            switch(action) {
                case 'add-superhero':
                    superheroList.unshift(value as Superhero);
                    break
                case 'edit-superhero':
                    const {previousValue = undefined, currentValue=undefined} = value || {} as any;
                    const modifieldSuperheroPosition = superheroList.findIndex(e => JSON.stringify(e) === JSON.stringify(previousValue));
                    superheroList[modifieldSuperheroPosition] = currentValue;
                    break;
                case 'remove-superhero':
                    superheroList = superheroList.filter(sh => JSON.stringify(sh) !== JSON.stringify(value));
                    break;
            }
        });
        return superheroList;
    }
}