import { CharacterDetail } from '../interfaces/interfaces';
import { getCharacterDetail } from '../services/getCharacterDetail';

export class CharacterMoreInfo extends HTMLElement {
  private characterId: number; // el id del personaje q se mostrara
  
  constructor(characterId: number) {
    super();
    this.characterId = characterId;
    this.attachShadow({ mode: 'open' });
    this.render();
    this.loadCharacterDetails();
  }
  
  async loadCharacterDetails() {
    try {
      // Muestra un mensajito de carga mientras se cogen los detalles
      const contentDiv = this.shadowRoot!.querySelector('.more-info-content');
      if (contentDiv) {
        contentDiv.innerHTML = '<p>cargando detalles...</p>';
      }
      
      // llama al servicio q le dara los detalles del personaje (segundo endpoint)
      const characterDetail = await getCharacterDetail(this.characterId);
      
      if (!characterDetail) {
        throw new Error('No se pudo cargar los detalles del personaje');
      }
      
      this.renderCharacterDetail(characterDetail);

    } catch (error) {
      console.error('error cargando detalles:', error);
      const contentDiv = this.shadowRoot!.querySelector('.more-info-content');

      if (contentDiv) {
        contentDiv.innerHTML = '<p>Error al cargar los detalles</p>';
      }
    }
  }
  
  renderCharacterDetail(character: CharacterDetail) {
    const contentDiv = this.shadowRoot!.querySelector('.more-info-content');
    if (!contentDiv) return;
    
    contentDiv.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <h2>${character.name}</h2>
      
      <div class="info-container">
        <p class="specific-info">Género:</p>
        <p>${character.gender}</p>
      </div>
      
      <div class="info-container">
        <p class="specific-info">Cabello:</p>
        <p>${character.hair}</p>
      </div>
      
      ${character.occupation ? `
      <div class="info-container">
        <p class="specific-info">Ocupación:</p>
        <p>${character.occupation}</p>
      </div>
      ` : ''}
      
      ${character.firstEpisode ? `
      <div class="info-container">
        <p class="specific-info">1er Episodio:</p>
        <p>${character.firstEpisode}</p>
      </div>
      ` : ''}
      
      ${character.voicedBy ? `
      <div class="info-container">
        <p class="specific-info">Voz por:</p>
        <p>${character.voicedBy}</p>
      </div>
      ` : ''}
      
      ${character.relatives && character.relatives.length > 0 ? `
      <div class="info-container">
        <p class="specific-info">Familiares:</p>
        <p>${character.relatives.join(', ')}</p>
      </div>
      ` : ''}
      
      ${character.wikiUrl ? `
      <div class="info-container">
        <p class="specific-info">Wiki:</p>
        <a href="${character.wikiUrl}" target="_blank">Ver en Wiki</a>
      </div>
      ` : ''}
    `;
  }
  
  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        
        .more-info-container {
          background-color: white;
          border-radius: 10px;
          padding: 20px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
        }
        
        .more-info-container img {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 5px;
        }
        
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: #FF5722;
          color: white;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
        }
        
        .info-container {
          display: flex;
          margin: 8px 0;
        }
        
        .specific-info {
          font-weight: bold;
          width: 120px;
          flex-shrink: 0;
        }
        
        a {
          color: #FF9800;
          text-decoration: none;
        }
        
        a:hover {
          text-decoration: underline;
        }
      </style>
      
      <div class="more-info-container">
        <button class="close-button">x</button>
        <div class="more-info-content">
          <p>Cargando detalles...</p>
        </div>
      </div>
    `;
    
    //event listener para cerrar poder cerrar el 'popup'
    this.shadowRoot!.querySelector('.close-button')?.addEventListener('click', () => {
      this.remove();
    });
  }
}

