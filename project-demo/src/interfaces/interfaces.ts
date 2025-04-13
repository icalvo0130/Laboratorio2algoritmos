//interfaz para los datos de la api
export interface ApiCharacterList {
    id: number;
    name: string;
    image: string;
    gender: string;
    hair: string;
    occupation?: string;
    url: string;
}
  
//hereda de ApiCharacterList y agrega cositas
export interface ApiCharacterDetail extends ApiCharacterList {
    relatives: Array<{ _id: string, name: string }>;
    wikiUrl: string;
    firstEpisode?: string;
    voicedBy?: string;
    allOccupations?: string[];
}
  
//lo que necesito en realidad para las tajeticas
export interface CharacterBasic {
    id: number;
    name: string;
    image: string;
}
  
//lo que se va a mostrar en el detalle
export interface CharacterDetail {
    id: number;
    name: string;
    image: string;
    gender: string;
    hair: string;
    occupation?: string;
    firstEpisode?: string;
    voicedBy?: string;
    relatives?: string[];
    wikiUrl?: string;
}