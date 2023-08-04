import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokeapiService } from 'src/app/core/services/pokeapi.service';
import { Result, ResultGeneration, ResultType, Pokemon } from '../../../../core/interfaces/pokemon.interface';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  word : string = '';
  @Input() pokemons: Result[] = [];
  @Output() filteredPokemons: EventEmitter<Result[]> = new EventEmitter();
  @Output() filteredGPokemons: EventEmitter<Result[]> = new EventEmitter();
  types : ResultType[] = [];
  generations : ResultGeneration[] = [];

  constructor(private poke:PokeapiService) { }

  ngOnInit(): void {
    this.poke.getTypes()
    .subscribe(data => this.types = data.results);
    this.poke.getGenerations()
    .subscribe(data => this.generations = data.results);
  }

  search(){
    const filterPokemon: Result[] = this.pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(this.word.toLowerCase()))
      if(filterPokemon.length == 0){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se encontró el producto',
      })} else {
        this.filteredPokemons.emit(filterPokemon);
      }
  }

  filterGeneration(event:string){
    this.poke.getPokemonGenerations(event)
    .subscribe(data => {
      const filterGenerationPokemon = data.pokemon_species;
      this.filteredPokemons.emit(filterGenerationPokemon);
    })
  }

  filterType(event:string){
    this.poke.getPokemonTypes(event)
    .subscribe(data => {
      const filterTypePokemon = data.pokemon;
      console.log(filterTypePokemon);
/*       this.filteredPokemons.emit(filterTypePokemon); */
    })
  }

}
