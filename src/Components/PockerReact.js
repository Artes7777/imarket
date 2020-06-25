import React, { useState } from 'react';
import {deck} from '../deck';
import Сroupier from '../img/2.png';
import Gamer from '../img/1.jpg';

import './PockerReact.css';

const PockerReact = () => {
  const [startGame, setGameStart] = useState(false);
  const [firstHandsCards, setFirstHandCards] = useState([]);
  const [secondHandCards, setSecondHandCards] = useState([]);
  const [firstHandSum , setFirstHandSum] = useState(0);
  const [secondHandSum , setSecondHandSum] = useState(0);

  const handOverCards = () => {
    setGameStart(true);
    
    const firstHandsfirstCard = takeCard();
    deleteCardFromDeck(firstHandsfirstCard);

    const firstHandsSecondCard = takeCard();
    deleteCardFromDeck(firstHandsSecondCard);
    
    const secondHandFirstCard = takeCard();
    deleteCardFromDeck(secondHandFirstCard);

    const secondHandSecondCard = takeCard();
    deleteCardFromDeck(secondHandSecondCard);
    
    setFirstHandCards([...firstHandsCards, firstHandsfirstCard, firstHandsSecondCard])
    setSecondHandCards([...secondHandCards, secondHandFirstCard, secondHandSecondCard]);

    const firstHandsSum = firstHandsfirstCard.value + firstHandsSecondCard.value;
    const secondHandsSum = secondHandFirstCard.value + secondHandSecondCard.value;

    setFirstHandSum(firstHandsSum);
    setSecondHandSum(secondHandsSum);

    console.log(firstHandsSum);
    console.log(secondHandsSum); 
  }

  const takeCard = () => {
    return deck[Math.floor(Math.random() * deck.length)];
  }

  const deleteCardFromDeck = (card) => {
    const index = deck.findIndex((elem) => elem.number === card.number);
    deck.splice(index, 1);
  }
   
  return (
    <div>
      {!startGame && <div><button onClick = {handOverCards}>Сдать карты</button></div>}
      {startGame && 
        <div>
          <div className = {firstHandSum > secondHandSum ? "winner" : null}>
            {firstHandSum > secondHandSum ? <div>winner</div> : null}
            <img alt = "Крупье" style = {{"width" : "100px", "height" : "100px"}} src = {Сroupier}/>
            <div className = "userCards">
              {firstHandsCards.length === 2 ? firstHandsCards.map((card) => {
                return <div key = {card.number}><img alt = "карта" style = {{"width" : "100px", "height" : "100px"}} src = {card.img} /></div>
              }) : "Загрузка"}
            </div>
          </div>
          <div className = {secondHandSum > firstHandSum  ? "winner" : null}>
            <div className = "userCards">
              {firstHandsCards.length === 2 ? secondHandCards.map((card) => {
                return <div key = {card.number}><img alt = "карта" style = {{"width" : "100px", "height" : "100px"}} src = {card.img} /></div>
              }): "Загрузка" }
            </div>
            <img alt = "Игрок" style = {{"width" : "100px", "height" : "100px"}} src = {Gamer}/>
            {secondHandSum > firstHandSum  ? <div>winner</div> : null}
          </div> 
        </div>
      }
    </div>
  )
}

export default PockerReact;