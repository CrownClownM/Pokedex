import { Component, OnInit } from '@angular/core';
import { Pokemon, Result } from 'src/app/core/interfaces/pokemon.interface';
import { PokeapiService } from 'src/app/core/services/pokeapi.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  loadData: boolean = true;
  length: number  = 151;
  index: number = 0;
  pokemons !: Result[];
  pokemonsPaginator !: Result[];
  pokemonsSearch !: Result[];

  constructor(private poke: PokeapiService) { }

  ngOnInit(): void {
    this.poke.getPokemons(this.length)
    .subscribe( data => {
      this.pokemons = data.results.slice(0,16);
      this.pokemonsPaginator = data.results;
      this.pokemonsSearch = data.results;
      this.length = data.results.length;
      this.loadData = false;
    });
  }

  paginated(pokemonsPaginated:Result[]){
    this.pokemons = pokemonsPaginated;
  }

  searched(pokemonsSearched:Result[]){
    this.pokemons = pokemonsSearched.slice(0,16);
    this.pokemonsPaginator = pokemonsSearched;
    this.length = pokemonsSearched.length;
  }

  generation(pokemonsGeneration:Result[]){
    this.pokemons = pokemonsGeneration.slice(0,16);
    this.pokemonsPaginator = pokemonsGeneration;
    this.length = pokemonsGeneration.length;
  }

  type(pokemonsType:Result[]){
    this.pokemons = pokemonsType.slice(0,16);
    this.pokemonsPaginator = pokemonsType;
    this.length = pokemonsType.length;
  }

}
