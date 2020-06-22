import React, { useState } from 'react';
import {сardsdeck} from '../cards';
import {deck} from '../deck';
import Сroupier from '../img/2.png';
import Gamer from '../img/1.jpg';

import './PockerReact.css';

const PockerReact = () => {
  const [startGame, setGameStart] = useState(false);
  const [firstHandsCards, setFirstHandFirstCard] = useState([]);
  const [secondHandCards, setSecondHandFirstCard] = useState([]);
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

    const firstHandsSum = findCard(firstHandsfirstCard).value + findCard(firstHandsSecondCard).value;
    const secondHandsSum = findCard(secondHandFirstCard).value + findCard(secondHandSecondCard).value;

    setFirstHandSum(firstHandsSum);
    setSecondHandSum(secondHandsSum);
    setFirstHandFirstCard([...firstHandsCards, findCard(firstHandsfirstCard), findCard(firstHandsSecondCard)])
    setSecondHandFirstCard([...secondHandCards, findCard(secondHandFirstCard), findCard(secondHandSecondCard)]);
    console.log(firstHandsSum);
    console.log(secondHandsSum);
  }

  const takeCard = () => {
    return сardsdeck[Math.floor(Math.random() * сardsdeck.length + 1)];
  }

  const deleteCardFromDeck = (card) => {
    const index = сardsdeck.findIndex((elem) => elem === card);
    сardsdeck.splice(index, 1);
  }

  const findCard = (card) => {
    const myCard = deck.find( (elem) => elem.number === card)
    return myCard; 
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
              {firstHandsCards.map((card) => {
                return <div key = {card.number}><img style = {{"width" : "100px", "height" : "100px"}} src = {card.img} /></div>
              })}
          </div>
          </div>
          <div className = {secondHandSum > firstHandSum  ? "winner" : null}>
            <div className = "userCards">
              {secondHandCards.map((card) => {
                return <div key = {card.number}><img style = {{"width" : "100px", "height" : "100px"}} src = {card.img} /></div>
              })}
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