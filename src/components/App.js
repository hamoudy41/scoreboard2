import React, {Component} from 'react';

import Header from './Header';
  
import Player from './Player';
import AddPlayerForm from './AddPlayerForm';
import {HashRouter} from 'react-router-dom';

class App extends Component {
  state = {
    players: [
      {
        name: "Guil",
        score: 0,
        id: 1
      },
      {
        name: "Treasure",
        score: 0,
        id: 2
      },
      {
        name: "Ashley",
        score: 0,
        id: 3
      },
      {
        name: "James",
        score: 0,
        id: 4
      }
    ]
  };

  handleScoreChange = (index, delta) => {
    this.setState( prevState => ({
      score: prevState.players[index].score += delta
    }));
  }
prevPlayerId = this.state.players.length;
  
handleAddPlayer = (name) => {
    this.setState( prevState => {
      
      return {players: [
        ...prevState.players,
        {
          name,
          score: 0,
          id: this.prevPlayerId += 1
        }
      ]}
    })
  }

  handleRemovePlayer = (id) => {
    this.setState( prevState => {
      return {
        players: prevState.players.filter(p => p.id !== id)
      };
    });
  }

  getHighScore = () => {
    const scores = this.state.players.map( p => p.score );
    const highScore = Math.max(...scores);
    if (highScore) {
      return highScore;
    } 
    return null;
  };

  render() {
    const highScore = this.getHighScore();
    return (
      <HashRouter basename= "/scoreboard">
      <div className="scoreboard">
        <Header 
          players={this.state.players} 
        />
  
        {/* Players list */}
        {this.state.players.map( (player, index) =>
          <Player 
            name={player.name}
            score = {player.score}
            id={player.id}
            key={player.id.toString()} 
            index = {index}
            changeScore = {this.handleScoreChange}
            removePlayer={this.handleRemovePlayer} 
            isHighScore={highScore === player.score}  // is a player's 'score' prop equal to the high score?          
          />
          
        )}
        <AddPlayerForm 
        addPlayer = {this.handleAddPlayer}
        />
      </div>
      </HashRouter>
    );
  }
}

export default App;
