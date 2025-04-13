import { getCharacters } from '../services/getCharacters';
import { CharacterCard } from '../components/CharacterCard';
import { CharacterMoreInfo } from '../components/CharacterMoreInfo';
import { CharacterBasic } from '../interfaces/interfaces';

export class BobsBurgersPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  async connectedCallback() {
    try {
      //pone mensaje de carga mientras aparecen las cosas
      this.shadowRoot!.innerHTML = '<p>Cargando personajes...</p>';
      
      //llama al servicio que obtiene los personajes
      const characters = await getCharacters();
      
      if (!characters || characters.length === 0) {
        this.shadowRoot!.innerHTML = '<p>No se pudieron cargar los personajes</p>';
        return;
      }
      
      this.render(characters);
      
      // el evento personalizado del detail del personaje
      this.shadowRoot!.addEventListener('show-character-detail', (e: Event) => {
        const customEvent = e as CustomEvent;
        const characterId = customEvent.detail.characterId;//
        this.showCharacterDetail(characterId);//llama el encargado de mostrar los detalles
      });
      
    } catch (error) {
      console.error("Error:", error);
      this.shadowRoot!.innerHTML = '<p>Error al cargar los personajes</p>';
    }
  }
  
  //muestra el popup con el detalle del personaje
  showCharacterDetail(characterId: number) {
    const moreinfo = new CharacterMoreInfo(characterId); 
    document.body.appendChild(moreinfo); //agrega el componente al body
  }

  render(characters: CharacterBasic[]) {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: Arial, sans-serif;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }
        
        h1 {
          color: #FF9800;
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 30px;
        }
        
        .card-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }
      </style>
      
      <div class="container">
        <h1>Personajes de Bob's Burgers</h1>
        <div class="card-container" id="cards-container"></div>
      </div>
    `;
    
    const cardsContainer = this.shadowRoot!.getElementById('cards-container');
    
    //crea y agregar tarjetas de personajes
    characters.forEach(character => {
      const card = new CharacterCard(character); //por cada personaje, una tarjeta
      cardsContainer!.appendChild(card);
    });
  }
}
