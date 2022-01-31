import React, { useState } from 'react';
import ReactDOM from 'react-dom';

let player = "A";

const matchWinner = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const crossStyle: any = {
  'width': '100%',
  'height':'100%',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '50px',
  'fontFamily': 'Verdana',
  'color': '#8acaca',
  'fontWeight': '700',
  'cursor': 'pointer'
}

const winnerStyle: any = {
  'color': 'green',
}

const circleStyle: any = {
  'borderRadius': '50%',
  'width': '80%',
  'height':'80%',
  'boxSizing': 'border-box',
  'border': '5px solid #8acaca',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'backgroundColor': 'transparent',
  'cursor': 'pointer'
}

const squareStyle: any = {
  'flex': '1 0 25%',
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle: any = {
  flexWrap: 'wrap',
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'row',
  border: '3px #eee solid'
}

const containerStyle: any = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle: any = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle: any = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

class Square extends React.Component<{value: string, index: any, onClick: any, end: any, callPlayer: any, status: any}> {
  setSquare: (id: number) => void;
  constructor(props: any){
    super(props);

    this.state = {
      player: player,
    };

    this.setSquare = (id: number): void => {
      if(player === "A") {
        player = "B"
      } else {
        player = "A"
      }
      this.setState(state => ({
        player: this.props.value,
      }));
      this.props.callPlayer(player, id);
    }
  }

  render() {
    
    return (
      <div
        onClick={ (this.props.value !== "" || this.props.end !== "¿?")? () => null : () => this.setSquare(this.props.index) }
        className="square"
        style={ squareStyle }>
        { this.props.value !== "" && (
          <div
            style={ (this.props.value === "A")? circleStyle : crossStyle }>
            { (this.props.value === "A")? "" : "X" }
          </div>
        )}
      </div>
    );
  }
}

class Board extends React.Component<{child1: any, winner: any, player: any}> {
  resetTicTac: () => void;
    checkWinner: (board: any) => void;
    board: string[];
    setPlayer: (data: any, id: any) => void;
    state: any;
  constructor(props: any){
    super(props);

    this.board = ["","","","","","","","",""];

    this.state = {
      board: this.board,
      winner: "¿?",
      player: player,
    };

    this.resetTicTac = () => {
      player = "A";
      this.board = ["","","","","","","","",""];
      this.setState(state => ({
        board: ["","","","","","","","",""],
        winner: "¿?",
        player: "A"
      }));
    }

    this.checkWinner = (board) => {
      let roundWon = false;
      for (let i = 0; i <= 7; i++) {
        const winCondition = matchWinner[i];
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
      }

      if (roundWon) {
          this.setState((state: any) => ({
            winner: (state.player === "A")? "Circle" : "Cross"
          }));
          return;
      }
    }

    this.setPlayer = (data,id) =>{
      this.board[id] = player;
      this.setState((state: any) => ({
        board: this.board,
        player: data
      }));
      this.checkWinner(this.board);
    }
  }

  render() {
    return (
      <div style={ containerStyle } className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{ (this.state.winner === "¿?")? (this.state.player === "A")? "Cross" : "Circle" : "Maybe next time" }</span></div>
        <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span style={ winnerStyle }>{ this.state.winner }</span></div>
        <button onClick={ this.resetTicTac } style={buttonStyle}>Reset</button>
        <div style={boardStyle}>
          { this.state.board.map((square: any,key: number) => (
              <Square end={this.state.winner} value={square} ref={this.state.child1} callPlayer={this.setPlayer} index={key} key={key} status={true} onClick={undefined} />
          ))}
        </div>
      </div>
    );
  }
}

class TicTacToe extends React.Component {
    render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board child1={undefined} winner={undefined} player={undefined} {...this.props} />
        </div>
      </div>
    );
  }
}

export default TicTacToe;