import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MODEL_SUPERHERO_DISPLAYER } from './adapter/domain/ports/i-model-displayer';
import { ModelHeroesDisplayerService } from './adapter/domain/model-heroes-displayer.service';
import { SuperheroJsonAdapterService } from './adapter/superhero-json-adapter.service';
import { ADAPTER_SUPERHERO_JSON } from './adapter/domain/ports/i-adapter-superhero-json';
import { ADAPTER_SUPERHERO_PERSISTANCE } from './adapter/domain/ports/i-adapter-superhero-persistance';
import { SuperheroPersistanceAdapterService } from './adapter/superhero-persistance-adapter.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FilterHeroComponent } from './pages/filter-hero/filter-hero.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    FilterHeroComponent,
  ],
  providers: [
    {provide: MODEL_SUPERHERO_DISPLAYER, useClass: ModelHeroesDisplayerService},
    {provide: ADAPTER_SUPERHERO_JSON, useClass: SuperheroJsonAdapterService},
    {provide: ADAPTER_SUPERHERO_PERSISTANCE, useClass: SuperheroPersistanceAdapterService},
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Superhero';
}
