import { useState } from "react"

import cover from './assets/cover.png';
import sword from './assets/sword-1.png';
import shield from './assets/shield-1.png';
import scroll from './assets/scroll-1.png';
import potion from './assets/potion-1.png';
import helmet from './assets/helmet-1.png';
import ring from './assets/ring-1.png';
import Card from "./components/Card";

const cardImages = [
  { "src": sword, "alt": "Sword" },
  { "src": shield, "alt": "Shield" },
  { "src": scroll, "alt": "Scroll" },
  { "src": potion, "alt": "Potion" },
  { "src": helmet, "alt": "Helmet" },
  { "src": ring, "alt": "Ring" }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffledCards);
    setTurns(0);
  }

  console.log(cards, turns)

  return (
    <>
      <main>
        <h1>Magic Game</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="card-grid">
          {cards.map((card) => (
            <Card key={card.id} src={card.src} alt={card.alt} cover={cover} />
          ))}
        </div>
      </main>
    </>
  )
}

export default App
