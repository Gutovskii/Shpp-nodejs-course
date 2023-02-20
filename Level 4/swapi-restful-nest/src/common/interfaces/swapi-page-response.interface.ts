export interface SwapiPageResponse {
  count: number;
  next?: string;
  previous?: string;
  results: SwapiEntity[];
  detail?: string;
}

export interface SwapiEntity {
  [key: string]: string | string[] | number;
  url: string;
}
