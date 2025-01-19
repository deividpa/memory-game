import { useEffect, useState } from "react";
import useWindowDimensions from "./hooks/useWindowDimensions";

import Confetti from 'react-confetti';

import cover from './assets/cover1.png';
import sword from './assets/sword-1.png';
import shield from './assets/shield-1.png';
import scroll from './assets/scroll-1.png';
import potion from './assets/potion-1.png';
import helmet from './assets/helmet-1.png';
import ring from './assets/ring-1.png';

import Card from "./components/Card";
import Timer from "./components/Timer";

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
  const [gameOver, setGameOver] = useState(false);

  // Get the window size
  const { width, height } = useWindowDimensions();

  const [isTimerActive, setIsTimerActive] = useState(false);
  const [resetTimerFlag, setResetTimerFlag] = useState(false);

  // Shuffle the cards
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random(), matched: false}))

    setCards(shuffledCards);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setGameOver(false);
    setResetTimerFlag(true);
    setIsTimerActive(true);
  }
  

  // Handle a Choice
  const handleChoice = (card) => {
    // Prevent selecting more than 2 cards or already matched cards
    if(choiceOne && choiceTwo || card.matched) {
      return;
    }

    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if(choiceOne.alt === choiceTwo.alt) {
        // Prevent selecting the same card twice
        if(choiceOne.id === choiceTwo.id) {
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

  useEffect(() => {
    shuffleCards();
  }, [])

  // Check if all cards are matched
  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setGameOver(true);
      setIsTimerActive(false);
    }
  }, [cards]);

  // Reset the timer when the game is over
  useEffect(() => {
    if (resetTimerFlag) {
      setResetTimerFlag(false);
    }
  }, [resetTimerFlag]);

  // Reset choices and increment turns
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
  }

  return (
    <>
      <main>
        <h1>Memory Game</h1>
        <button onClick={shuffleCards}>New Game</button>

        <div className="stats">
          <p>
            Turnos: {turns}
          </p>
          <Timer isActive={isTimerActive} reset={resetTimerFlag} />
        </div>

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

        {gameOver && <Confetti width={width} height={height} />}
        
      </main>
    </>
  )
}

export default App
