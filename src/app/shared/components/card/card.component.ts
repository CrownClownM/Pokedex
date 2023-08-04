import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PokeDetailResponse, Result } from 'src/app/core/interfaces/pokemon.interface';
import { PokeapiService } from 'src/app/core/services/pokeapi.service';
import { PokemonInformationComponent } from 'src/app/home/components/pokemon-information/pokemon-information.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() pokemon !: Result;
  pokemonDetails !: PokeDetailResponse;

  constructor(private poke:PokeapiService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.poke.getPokemon(this.pokemon.name)
    .subscribe(data => this.pokemonDetails = data)
  }

  pokemonInformation(){
    const dialogRef = this.dialog.open(PokemonInformationComponent);

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

}
