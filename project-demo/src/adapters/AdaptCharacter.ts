import { ApiCharacterList, ApiCharacterDetail, CharacterBasic, CharacterDetail } from '../interfaces/interfaces';

export const adaptCharacterToBasic = (apiCharacter: ApiCharacterList): CharacterBasic => {
  return {
    id: apiCharacter.id,
    name: apiCharacter.name,
    image: apiCharacter.image
  };
};

//adapta un objeto de tipo ApiCharacterList a un objeto más simple de tipo CharacterBasic.
export const adaptCharactersToBasic = (characters: ApiCharacterList[]): CharacterBasic[] => {
  return characters.map(adaptCharacterToBasic);
};

//para el detalle del personaje
export const adaptCharacterToDetail = (apiCharacter: ApiCharacterDetail): CharacterDetail => {
  //relatives es un array q viene con mucha cosa, pero solo necesitamos el/los nombre
  const relatives = apiCharacter.relatives?.map(relative => relative.name) || [];
  
  return {
    id: apiCharacter.id,
    name: apiCharacter.name,
    image: apiCharacter.image,
    gender: apiCharacter.gender,
    hair: apiCharacter.hair,
    occupation: apiCharacter.occupation,
    firstEpisode: apiCharacter.firstEpisode,
    voicedBy: apiCharacter.voicedBy,
    relatives: relatives,
    wikiUrl: apiCharacter.wikiUrl
  };
};