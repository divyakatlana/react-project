export interface FilmsApi {
  count: number;
  next: any;
  previous: any;
  results: FilmResultDTO[]
}

export interface FilmResultDTO {
  imgPath: string;
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: any[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
  id?: number;
  backdrop_path: string;
}

export interface PeopleApi {
  count: number;
  next: any;
  previous: any;
  results: PeopleDTO[]
}

export interface PeopleDTO {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string,
  films: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
  id?: string;
  currFilm?: FilmResultDTO;
  filmList?: any;
  profile_path: string;
} 