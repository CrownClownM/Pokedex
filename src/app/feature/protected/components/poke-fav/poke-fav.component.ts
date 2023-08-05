import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Result } from 'src/app/core/interfaces/pokemon.interface';
import { PokeapiService } from 'src/app/core/services/pokeapi.service';

@Component({
  selector: 'app-poke-fav',
  templateUrl: './poke-fav.component.html',
  styleUrls: ['./poke-fav.component.css']
})
export class PokeFavComponent implements OnInit {

  lista !: string[];
  copyLista !: string[];
  filterPokemon : string = '';

  miFormulario: FormGroup = this.fb.group({
    poke: this.fb.array([])  
  });

  constructor(private fb: FormBuilder, private pokemonService:PokeapiService) { }

  ngOnInit(): void {
    this.pokemonService.getPokemons(151)
    .pipe(
      map(data => data.results.map(
        item => {
          return item.name;
        }
      ))
    )
    .subscribe(data => {
      this.lista = data;
      this.copyLista = [...this.lista];
    })

  }

  addPokeFields(): void {
    this.pokeField.push(this.createPokeFields());
  }

  private createPokeFields() {
    return this.fb.group({
      name: [''],
    });
  }

  get pokeField() {
    return this.miFormulario.get('poke') as FormArray;
  }

  filterPoke(): void {
    const filterValue = this.filterPokemon.trim().toLocaleLowerCase();
    this.copyLista= this.lista.filter((field) =>
      field.trim().toLocaleLowerCase().includes(filterValue)
    );
    this.copyLista.sort((first, second) =>
      first.localeCompare(second)
    );
  }

  cleanSearchFields(): void {
    this.filterPokemon = '';
    this.filterPoke();
  }

}
