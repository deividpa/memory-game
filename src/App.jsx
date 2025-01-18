import { useState } from "react"

const cardImages = [
  {"src": "assets/sword-1.png", "alt": "Sword"},
  {"src": "assets/shield-1.png", "alt": "Shield"},
  {"src": "assets/scroll-1.png", "alt": "Scroll"},
  {"src": "assets/potion-1.png", "alt": "Potion"},
  {"src": "assets/helmet-1.png", "alt": "Helmet"},
  {"src": "assets/ring-1.png", "alt": "Ring"}
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
      </main>
    </>
  )
}

export default App
