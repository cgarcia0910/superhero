import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { IModelSuperHeroDisplayer, MODEL_SUPERHERO_DISPLAYER } from '../../domain/ports/i-model-displayer';
import { SearchSuperheroComponent } from './search-superhero.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AsyncPipe, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CgcCustomMatTableComponent } from '../../shared/components';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { Superhero } from '../../domain/models/superhero';
import { MatDialog} from '@angular/material/dialog';


class MdDialogMock {
  open() {
    return {
      afterClosed: function() {
        return of('delete')
      }
    };
  }
};



describe('SearchSuperheroComponent', () => {
  let component: SearchSuperheroComponent;
  let fixture: ComponentFixture<SearchSuperheroComponent>;
  let spyIModelSuperHeroDisplayer: jasmine.SpyObj<IModelSuperHeroDisplayer>;
  let getSuperheroesListSpy: jasmine.Spy<(searchTerm?: string | undefined) => Observable<Superhero[]>>;
  let removeSuperheroSpy: jasmine.Spy<(sh?: Superhero) => Observable<boolean>>;
  let matDialogSpy: jasmine.SpyObj<MatDialog>;
  let matDialogSpyOpen: jasmine.Spy<() => () => string>;
  beforeEach(async () => {
    spyIModelSuperHeroDisplayer = jasmine.createSpyObj('IModelSuperHeroDisplayer', ['removeSuperhero', 'getSuperheroesList']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);
    matDialogSpyOpen = matDialogSpy.open.and.returnValue({afterClosed: (() => of('delete'))} as any) as any;
    getSuperheroesListSpy = spyIModelSuperHeroDisplayer.getSuperheroesList.and.returnValue(of([]));
    removeSuperheroSpy = spyIModelSuperHeroDisplayer.removeSuperhero.and.returnValue(of(true));
    await TestBed.configureTestingModule({
      imports: [SearchSuperheroComponent, NoopAnimationsModule, CgcCustomMatTableComponent, AsyncPipe, NgIf, FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatProgressSpinnerModule, MatButtonModule],
      providers: [
        {provide: MODEL_SUPERHERO_DISPLAYER, useValue: spyIModelSuperHeroDisplayer},
        // {provide: MatDialog, useValue: MdDialogMock}
        {provide: MatDialog, useClass: MdDialogMock},
        // {provide: MatDialog, useValue: matDialogSpy},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchSuperheroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call getSuperheroesList when the component is loaded', () => {
    expect(getSuperheroesListSpy).toHaveBeenCalledTimes(1);
  })
  it('should show a loading until the first load is completed', () => {
    component.ngOnInit()
    expect(component.loading()).toBe(true);
  })
  it('should hide loading once the data load is completed', fakeAsync(() => {
    fixture.detectChanges();
    expect(component.loading()).toBe(false);
  }) )
  it('shoult call getSuperheroesList with "a" when "a" is typed into input with a delay of 500ms', fakeAsync(() => {
    component.searchTermFormComponent.setValue('a')
    tick(500);
    expect(getSuperheroesListSpy).toHaveBeenCalledWith('a');
  }))
  it('should call delete shuperhero with the selected superhero', fakeAsync(() => {
    const deletedSuperhero = {
        id: 'asds8',
        nameLabel: 'Ahab',
        genderLabel: 'male',
        citizenshipLabel: 'United States of America',
        skillsLabel: 'superhuman strength',
        occupationLabel: 'psychologist',
        memberOfLabel: 'Horsemen of Apocalypse',
        creatorLabel: 'Walt Simonson'
    }
    const action = {action: 'delete-superhero', value: deletedSuperhero};
    component.doAction(action);
    expect(removeSuperheroSpy).toHaveBeenCalledTimes(1);
  }))

});
