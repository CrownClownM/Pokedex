import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokeid',
  pure: true,
})
export class PokeidPipe implements PipeTransform {

  transform(poke: number): string {

    let pokeId = poke.toString();
    if (pokeId.length === 1) {
        return pokeId = "00" + pokeId;
    } else if (pokeId.length === 2) {
        return pokeId = "0" + pokeId;
    }
    return poke.toString();

  }

}
