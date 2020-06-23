import React, { useState } from 'react';
import {сardsdeck} from '../cards';
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
    
    setFirstHandCards([...firstHandsCards, findCard(firstHandsfirstCard), findCard(firstHandsSecondCard)])
    setSecondHandCards([...secondHandCards, findCard(secondHandFirstCard), findCard(secondHandSecondCard)]);

    const firstHandsSum = findCard(firstHandsfirstCard).value + findCard(firstHandsSecondCard).value;
    const secondHandsSum = findCard(secondHandFirstCard).value + findCard(secondHandSecondCard).value;

    setFirstHandSum(firstHandsSum);
    setSecondHandSum(secondHandsSum);

    console.log(firstHandsSum);
    console.log(secondHandsSum); 
  }

  const takeCard = () => {
    return сardsdeck[Math.floor(Math.random() * сardsdeck.length)];
  }

  const deleteCardFromDeck = (card) => {
    const index = сardsdeck.findIndex((elem) => elem === card);
    сardsdeck.splice(index, 1);
  }

  const findCard = (card) => {
    return deck.find( (elem) => elem.number === card)
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