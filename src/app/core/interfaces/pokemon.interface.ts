export interface PokeResponse {
    count:    number;
    next:     string;
    previous: null;
    results:  Result[];
}

export interface Result {
    name: string;
    url:  string;
}


//Specific pokemon

export interface PokeDetailResponse {
    height:                   number;
    id:                       number;
    name:                     string;
    types:                    Type[];
    sprites:                  Sprites;
    weight:                   number;
}

export interface Species {
    name: string;
    url:  string;
}

export interface Type {
    slot: number;
    type: Species;
}

export interface Sprites {
    other:             Other;
}

export interface Other {
    "official-artwork": OfficialArtwork;
}

export interface OfficialArtwork {
    front_default: string;
    front_shiny:   string;
}

// Pokemon types select-list

export interface TypeResponse {
    count:    number;
    next:     null;
    previous: null;
    results:  Result[];
}

export interface ResultType {
    name: string;
    url:  string;
}

// Pokemon generations select-list

export interface GenerationResponse {
    count:    number;
    next:     null;
    previous: null;
    results:  Result[];
}

export interface ResultGeneration {
    name: string;
    url:  string;
}

// Pokemon types query

export interface TypeQueryResponse {
    pokemon: Pokemon[];
}

export interface Generation {
    name: string;
    url:  string;
}

export interface Pokemon {
    pokemon: Generation;
    slot?: number;
}


// Pokemon generations query

export interface GenerationQueryResponse {
    pokemon_species: MainRegion[];
}

export interface MainRegion {
    name: string;
    url:  string;
}

