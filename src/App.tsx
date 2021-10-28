import React, {Dispatch, FC, useState} from 'react';
import './App.css';

let currentId:number = 0;

const createId = ():string => {
  currentId++;
  return currentId.toString()
}

type Position = {
  x: number;
  y: number;
}

type Player = {
  id: string;
  color: string;
  score: number;
}

type BoardColors = {
  firstColor: string;
  secondColor: string;
}

enum GameStatus {
  startNewGame,
  gameInProgress,
  gameOver,
}

type GameState = {
  players: [Player, Player];
  turn: Player['id'];
  move: {
    fromPosition?: Position;
    toPosition?: Position;
  };
  board: {
    boardColors: BoardColors;
    gamePieces: {
      position: Position;
      player: Player;
      symbol: string;
      id: string;
    }[];
  };
  gameStatus: GameStatus;
  winner?: Player['id'];
}

const squareSize = 64;

const player1:Player = {
  id: 'player1',
  color: 'white',
  score: 0,
}

const player2:Player = {
  id: 'player2',
  color: 'black',
  score: 0,
}

const boardColors:BoardColors = {
  firstColor: 'grey',
  secondColor: 'red',
}

const getDefaultGameState = ():GameState => ({
  players: [player1, player2],
  turn: player1.id,
  move: {},
  board: {
    boardColors,
    gamePieces: [
      { player: player2, position: {x:0, y:0}, symbol: 'rook', id: createId() },
      { player: player2, position: {x:1, y:0}, symbol: 'knight', id: createId() },
      { player: player2, position: {x:2, y:0}, symbol: 'bishop', id: createId() },
      { player: player2, position: {x:3, y:0}, symbol: 'queen', id: createId() },
      { player: player2, position: {x:4, y:0}, symbol: 'king', id: createId() },
      { player: player2, position: {x:5, y:0}, symbol: 'bishop', id: createId() },
      { player: player2, position: {x:6, y:0}, symbol: 'knight', id: createId() },
      { player: player2, position: {x:7, y:0}, symbol: 'rook', id: createId() },
      { player: player2, position: {x:0, y:1}, symbol: 'pawn', id: createId() },
      { player: player2, position: {x:1, y:1}, symbol: 'pawn', id: createId() },
      { player: player2, position: {x:2, y:1}, symbol: 'pawn', id: createId() },
      { player: player2, position: {x:3, y:1}, symbol: 'pawn', id: createId() },
      { player: player2, position: {x:4, y:1}, symbol: 'pawn', id: createId() },
      { player: player2, position: {x:5, y:1}, symbol: 'pawn', id: createId() },
      { player: player2, position: {x:6, y:1}, symbol: 'pawn', id: createId() },
      { player: player2, position: {x:7, y:1}, symbol: 'pawn', id: createId() },
      { player: player1, position: {x:0, y:6}, symbol: 'pawn', id: createId() },
      { player: player1, position: {x:1, y:6}, symbol: 'pawn', id: createId() },
      { player: player1, position: {x:2, y:6}, symbol: 'pawn', id: createId() },
      { player: player1, position: {x:3, y:6}, symbol: 'pawn', id: createId() },
      { player: player1, position: {x:4, y:6}, symbol: 'pawn', id: createId() },
      { player: player1, position: {x:5, y:6}, symbol: 'pawn', id: createId() },
      { player: player1, position: {x:6, y:6}, symbol: 'pawn', id: createId() },
      { player: player1, position: {x:7, y:6}, symbol: 'pawn', id: createId() },
      { player: player1, position: {x:0, y:7}, symbol: 'rook', id: createId() },
      { player: player1, position: {x:1, y:7}, symbol: 'knight', id: createId() },
      { player: player1, position: {x:2, y:7}, symbol: 'bishop', id: createId() },
      { player: player1, position: {x:3, y:7}, symbol: 'queen', id: createId() },
      { player: player1, position: {x:4, y:7}, symbol: 'king', id: createId() },
      { player: player1, position: {x:5, y:7}, symbol: 'bishop', id: createId() },
      { player: player1, position: {x:6, y:7}, symbol: 'knight', id: createId() },
      { player: player1, position: {x:7, y:7}, symbol: 'rook', id: createId() },
    ],
  },
  gameStatus: GameStatus.startNewGame,
  winner: undefined,
});

const initialGameState:GameState = getDefaultGameState();

type GameActions = {
  makeMove: (position:Position) => void;
}

const createGameActions = (state:GameState, setState:Dispatch<GameState>):GameActions => {
  return {
    makeMove: (position) => {
      if (state.move.toPosition || !state.move.fromPosition)
        state.move = {fromPosition: position};

      // TODO: need game rules
      else {
        state.move.toPosition = position;
      }

      setState({...state});
      console.log({move: state.move});
    }
  }
}

type GameProps = {
  state: GameState;
  actions: GameActions;
}

interface IGamePiece {
  gameProps: GameProps;
  pieceState: GameState['board']['gamePieces'][0];
}

const Square:FC<any> = ({style={}, ...props}) => <span style={{width: squareSize, height: squareSize, display:'inline-block', ...style}} {...props}/>;

const GamePiece:FC<IGamePiece> = ({pieceState:{position, player, symbol}, gameProps}) => {
  const handleClick = () => {
    console.log({player, symbol, position});
    gameProps.actions.makeMove(position);
  }

  return (
    <div onClick={handleClick} style={{width: squareSize, height: squareSize, position: 'absolute', left: position.x * squareSize, top: position.y * squareSize, padding: 10}}>
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

const Board:FC<{ gameProps: GameProps }> = ({gameProps}) => {
  const {boardColors, gamePieces} = gameProps.state.board;
  return (
    <div style={{position:'relative', width: squareSize * 8, height: squareSize * 8}}>
      <Row position={{x:0, y:0}} boardColors={boardColors}/>
      <Row position={{x:0, y:1}} boardColors={{firstColor:boardColors.secondColor, secondColor:boardColors.firstColor}}/>
      <Row position={{x:0, y:2}} boardColors={boardColors}/>
      <Row position={{x:0, y:3}} boardColors={{firstColor:boardColors.secondColor, secondColor:boardColors.firstColor}}/>
      <Row position={{x:0, y:4}} boardColors={boardColors}/>
      <Row position={{x:0, y:5}} boardColors={{firstColor:boardColors.secondColor, secondColor:boardColors.firstColor}}/>
      <Row position={{x:0, y:6}} boardColors={boardColors}/>
      <Row position={{x:0, y:7}} boardColors={{firstColor:boardColors.secondColor, secondColor:boardColors.firstColor}}/>

      {gamePieces.map(i => <GamePiece key={i.id} pieceState={i} gameProps={gameProps}/>)}
    </div>
  )
}

function App() {
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  const gameProps:GameProps = {
    actions: createGameActions(gameState, setGameState),
    state: gameState,
  };

  return (
    <div className="App" style={{width:'100vw', height: '100vh'}}>
      <Board {...gameState.board} gameProps={gameProps}/>
    </div>
  );
}

export default App;
