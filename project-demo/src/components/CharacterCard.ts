import { CharacterBasic } from '../interfaces/interfaces';

export class CharacterCard extends HTMLElement {
  character: CharacterBasic;
  
  constructor(character: CharacterBasic) {
    super();
    this.character = character;
    this.attachShadow({ mode: 'open' });
    this.render();
  }
  
  connectedCallback() {
    
    this.shadowRoot!.querySelector('button')?.addEventListener('click', () => {
      // se creo un evento personalizado al hacer clic en el botón
      const event = new CustomEvent('show-character-detail', {
        bubbles: true, //deja q se vaya el evento hacia arriba 
        composed: true, //deja q el evento sea escuchado fuera del shadow 
        detail: { characterId: this.character.id } 
      });
      this.dispatchEvent(event);
    });
  }
  
  render() {
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
        }
        
        .character-card {
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        
        
        .character-card img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }
        
        .card-content {
          padding: 15px;
        }
        
        .card-content h3 {
          margin-top: 0;
          color: #333;
        }
        
        button {
          background-color: #FF9800;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s;
          width: 100%;
          margin-top: 10px;
        }
        
        button:hover {
          background-color: #F57C00;
        }
      </style>
      
      <div class="character-card">
        <img src="${this.character.image}" >
        <div class="card-content">
          <h3>${this.character.name}</h3>
          <button>Mas informacion</button>
        </div>
      </div>
    `;
  }
}

