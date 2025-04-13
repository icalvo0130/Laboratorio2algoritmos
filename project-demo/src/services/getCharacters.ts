import { adaptCharactersToBasic } from '../adapters/AdaptCharacter';
import { ApiCharacterList } from '../interfaces/interfaces';

export const getCharacters = async () => {
  try {
    const response = await fetch("https://bobsburgers-api.herokuapp.com/characters/");
    
    if (!response.ok) {
      throw console.error(`Error:`, response.status);
    }
    
    //respuesta arreglo de objetos
    const data = await response.json() as ApiCharacterList[];
    //adaptamos el arreglo a adaptCharactersToBasic
    return adaptCharactersToBasic(data);

  } catch (error) {
    console.error("Error fetching characters:", error);
    return undefined;
  }
};