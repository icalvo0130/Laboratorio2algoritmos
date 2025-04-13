import { adaptCharacterToDetail } from '../adapters/AdaptCharacter';
import { ApiCharacterDetail } from '../interfaces/interfaces';

//esta es la del "popup"/ mas info del personaje 
export const getCharacterDetail = async (id: number) => {
  try {
    //segundo endpoint es el detalle del personaje segun su id
    const response = await fetch(`https://bobsburgers-api.herokuapp.com/characters/${id}`);
    
    if (!response.ok) {
      throw console.error(`Error:`, response.status);
    }
    
    //lo convierte en ApiCharacterDetail 
    const data = await response.json() as ApiCharacterDetail;
    return adaptCharacterToDetail(data);

  } catch (error) {
    console.error("Error fetching characters:", error);
    return undefined;
  }
};