import React, {FC, useState} from 'react';
import './App.css';

type Position = {
  x: number;
  y: number;
}

type Player = {
  color: string;
}

type BoardColors = {
  firstColor: string;
  secondColor: string;
}

const squareSize = 64;

const player1:Player = {
  color: 'white',
}

const player2:Player = {
  color: 'black',
}

const boardColors:BoardColors = {
  firstColor: 'grey',
  secondColor: 'red',
}

const Square:FC<any> = ({style={}, ...props}) => <span style={{width: squareSize, height: squareSize, display:'inline-block', ...style}} {...props}/>;

interface IGamePiece {
  initialPosition: Position;
  player: Player;
  symbol: string;
}

const GamePiece:FC<IGamePiece> = ({initialPosition, player, symbol}) => {
  // TODO: change state as players play
  const [position, setPosition] = useState<Position>(initialPosition);
  return (
    <div style={{width: squareSize, height: squareSize, position: 'absolute', left: position.x * squareSize, top: position.y * squareSize, padding: 10}}>
      <div style={{backgroundColor: player.color, width: squareSize - 20, height: squareSize - 20, borderRadius: '50%'}}/>
      <div>
        {symbol}
      </div>
    </div>
  )
}

const Row:FC<{boardColors:BoardColors; position:Position}> = ({boardColors:{firstColor, secondColor}, position}) =>
  <div style={{position:'absolute', top: position.y * squareSize}}>
    <Square style={{backgroundColor:firstColor}}/>
    <Square style={{backgroundColor:secondColor}}/>
    <Square style={{backgroundColor:firstColor}}/>
    <Square style={{backgroundColor:secondColor}}/>
    <Square style={{backgroundColor:firstColor}}/>
    <Square style={{backgroundColor:secondColor}}/>
    <Square style={{backgroundColor:firstColor}}/>
    <Square style={{backgroundColor:secondColor}}/>
  </div>;

const Board:FC<{boardColors:BoardColors}> = ({boardColors}) =>
  <div style={{position:'relative', width: squareSize * 8, height: squareSize * 8}}>
    <Row position={{x:0, y:0}} boardColors={boardColors}/>
    <Row position={{x:0, y:1}} boardColors={{firstColor:boardColors.secondColor, secondColor:boardColors.firstColor}}/>
    <Row position={{x:0, y:2}} boardColors={boardColors}/>
    <Row position={{x:0, y:3}} boardColors={{firstColor:boardColors.secondColor, secondColor:boardColors.firstColor}}/>
    <Row position={{x:0, y:4}} boardColors={boardColors}/>
    <Row position={{x:0, y:5}} boardColors={{firstColor:boardColors.secondColor, secondColor:boardColors.firstColor}}/>
    <Row position={{x:0, y:6}} boardColors={boardColors}/>
    <Row position={{x:0, y:7}} boardColors={{firstColor:boardColors.secondColor, secondColor:boardColors.firstColor}}/>

    <GamePiece player={player2} initialPosition={{x:0, y:0}} symbol={'rook'}/>
    <GamePiece player={player2} initialPosition={{x:1, y:0}} symbol={'knight'}/>
    <GamePiece player={player2} initialPosition={{x:2, y:0}} symbol={'bishop'}/>
    <GamePiece player={player2} initialPosition={{x:3, y:0}} symbol={'queen'}/>
    <GamePiece player={player2} initialPosition={{x:4, y:0}} symbol={'king'}/>
    <GamePiece player={player2} initialPosition={{x:5, y:0}} symbol={'bishop'}/>
    <GamePiece player={player2} initialPosition={{x:6, y:0}} symbol={'knight'}/>
    <GamePiece player={player2} initialPosition={{x:7, y:0}} symbol={'rook'}/>
    <GamePiece player={player2} initialPosition={{x:0, y:1}} symbol={'pawn'}/>
    <GamePiece player={player2} initialPosition={{x:1, y:1}} symbol={'pawn'}/>
    <GamePiece player={player2} initialPosition={{x:2, y:1}} symbol={'pawn'}/>
    <GamePiece player={player2} initialPosition={{x:3, y:1}} symbol={'pawn'}/>
    <GamePiece player={player2} initialPosition={{x:4, y:1}} symbol={'pawn'}/>
    <GamePiece player={player2} initialPosition={{x:5, y:1}} symbol={'pawn'}/>
    <GamePiece player={player2} initialPosition={{x:6, y:1}} symbol={'pawn'}/>
    <GamePiece player={player2} initialPosition={{x:7, y:1}} symbol={'pawn'}/>

    <GamePiece player={player1} initialPosition={{x:0, y:6}} symbol={'pawn'}/>
    <GamePiece player={player1} initialPosition={{x:1, y:6}} symbol={'pawn'}/>
    <GamePiece player={player1} initialPosition={{x:2, y:6}} symbol={'pawn'}/>
    <GamePiece player={player1} initialPosition={{x:3, y:6}} symbol={'pawn'}/>
    <GamePiece player={player1} initialPosition={{x:4, y:6}} symbol={'pawn'}/>
    <GamePiece player={player1} initialPosition={{x:5, y:6}} symbol={'pawn'}/>
    <GamePiece player={player1} initialPosition={{x:6, y:6}} symbol={'pawn'}/>
    <GamePiece player={player1} initialPosition={{x:7, y:6}} symbol={'pawn'}/>
    <GamePiece player={player1} initialPosition={{x:0, y:7}} symbol={'rook'}/>
    <GamePiece player={player1} initialPosition={{x:1, y:7}} symbol={'knight'}/>
    <GamePiece player={player1} initialPosition={{x:2, y:7}} symbol={'bishop'}/>
    <GamePiece player={player1} initialPosition={{x:3, y:7}} symbol={'queen'}/>
    <GamePiece player={player1} initialPosition={{x:4, y:7}} symbol={'king'}/>
    <GamePiece player={player1} initialPosition={{x:5, y:7}} symbol={'bishop'}/>
    <GamePiece player={player1} initialPosition={{x:6, y:7}} symbol={'knight'}/>
    <GamePiece player={player1} initialPosition={{x:7, y:7}} symbol={'rook'}/>
  </div>

function App() {
  return (
    <div className="App" style={{width:'100vw', height: '100vh'}}>
      <Board boardColors={boardColors}/>
    </div>
  );
}

export default App;
