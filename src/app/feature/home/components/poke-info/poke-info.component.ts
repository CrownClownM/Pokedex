import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PokeDetailResponse } from 'src/app/core/interfaces/pokemon.interface';

@Component({
  selector: 'app-poke-info',
  templateUrl: './poke-info.component.html',
  styleUrls: ['./poke-info.component.css']
})
export class PokeInfoComponent implements OnInit {

  pokemonDetails !: PokeDetailResponse;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialog: MatDialogRef<PokeInfoComponent>) { }

  ngOnInit(): void {
    this.pokemonDetails = this.data;
    console.log(this.pokemonDetails);
  }

}
