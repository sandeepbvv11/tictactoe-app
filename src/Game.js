import React from "react";
import { Board } from "./Board";
import "./Game.css";
import { useState } from "react";
import { ResultModal } from "./ResultModal";
import { calculateWinner } from "./WinnerCalculater";
export const Game = ({value}) => {
  const [cellValues,setCellValues]=useState(["","","","","","","","",""]);
  const [xIsNext,setXIsNext]=useState(true);
  const [gameOver,setgameOver]=useState(false);
  const [winningCombination,setWinningCombination]=useState([]);
  const isCellEmpty=(cellIndex)=>cellValues[cellIndex]==="";
  const [numberOfTurnsLeft,setNumberOfTurnsLeft]=useState(9);
  const [winner,setWinner]=useState();
  const cellClicked=(cellIndex)=>{
    if(isCellEmpty(cellIndex)){
      
    const newCellValues=[...cellValues];
    newCellValues[cellIndex]=xIsNext?"X":"O";
    const newNumberOfTurnsLeft= numberOfTurnsLeft-1;
    //Calculate result
    const calcResult=calculateWinner(newCellValues,newNumberOfTurnsLeft,cellIndex);
    setXIsNext(!xIsNext);
    setCellValues(newCellValues);
    setgameOver(calcResult.hasResult);
    setNumberOfTurnsLeft(newNumberOfTurnsLeft);
    setWinner(calcResult.winner);
    setWinningCombination(calcResult.winningCombination);
    }
    //console.log('Cell '+ cellIndex+ ' clicked')
  }
  return (
    <>
      <div id="game">
        <h1>Tic Tac Toe</h1>
        <Board cellValues={cellValues} winningCombination={winningCombination} cellClicked={cellClicked}/>
      </div>
      <ResultModal gameOver={gameOver} winner={winner}/>
      
    </>
  );
};
