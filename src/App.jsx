import { useEffect, useState } from "react"

import cover from './assets/cover1.png';
import sword from './assets/sword-1.png';
import shield from './assets/shield-1.png';
import scroll from './assets/scroll-1.png';
import potion from './assets/potion-1.png';
import helmet from './assets/helmet-1.png';
import ring from './assets/ring-1.png';
import Card from "./components/Card";

const cardImages = [
  { "src": sword, "alt": "Sword", matched: false },
  { "src": shield, "alt": "Shield", matched: false },
  { "src": scroll, "alt": "Scroll", matched: false },
  { "src": potion, "alt": "Potion", matched: false },
  { "src": helmet, "alt": "Helmet", matched: false },
  { "src": ring, "alt": "Ring", matched: false }
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setCards(shuffledCards);
    setTurns(0);
  }

  // Handle a Choice
  const handleChoice = (card) => {
    // Prevent selecting more than 2 cards
    if(choiceOne && choiceTwo) {
      return;
    }

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {

    if (choiceOne && choiceTwo) {
      if(choiceOne.alt === choiceTwo.alt) {
        if(choiceOne.id === choiceTwo.id) {
          console.log("You can't pick the same card twice!")
          return;
        }
        setCards(prevCards => prevCards.map((card) => {
          if(card.alt === choiceOne.alt) {
            return {...card, matched: true}
          }
          return card;
        }))
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }

      
    }
  }, [choiceOne, choiceTwo])

  // Reset choices and increment turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  }

  useEffect(() => {
    shuffleCards();
  }, [])

  return (
    <>
      <main>
        <h1>Memory Game</h1>
        <button onClick={shuffleCards}>New Game</button>
        <p>Turns: {turns}</p>
        <div className="card-grid">
          {cards.map((card) => (
            <Card
              key={card.id}
              card={card}
              cover={cover}
              handleChoice={handleChoice}
              flipped={card.id === choiceOne?.id || card.id === choiceTwo?.id || card.matched}
            />
          ))}
        </div>
      </main>
    </>
  )
}

export default App
