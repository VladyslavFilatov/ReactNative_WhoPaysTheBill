import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import Toast from 'react-native-toast-message';

const MyContext = React.createContext();

class MyProvider extends Component {
  state = {
    stage: 1,
    players: [],
    results: '',
  };

  addPlayerHandler = (name) => {
    this.setState((prevState, props) => ({
        players:[
            ...prevState.players,
            name
        ]
    }));
  };

  nextHandler = () => {
    const {players} = this.state;
    
    if (players.length < 2) {
      //Alert.alert('dude, come on!!!');
      Toast.show({
        type: 'error',
        text1: 'Sorry',
        text2: 'You need at least 2 players',
        position: 'bottom',
      });
    } else {
      this.setState({
        stage: 2,
      }, () => {
        this.generateLooser()
      });
    }
  };

  removePlayerHandler = (idx) => {
    let newArray = this.state.players;
    newArray.splice(idx, 1);
    this.setState({players: newArray});
  };

  generateLooser = () => {
    const {players} = this.state;
    this.setState({
      result: players[Math.floor(Math.random() * players.length)],
    });
  };

  resetGame = () => {
    this.setState({
      stage: 1,
      players: [],
      result: '',
    })
  }

  render() {
    return (
      <>
        <MyContext.Provider 
          value={{
            state: this.state,
            addPlayer: this.addPlayerHandler,
            removePlayer: this.removePlayerHandler,
            next: this.nextHandler,
            getNewLooser: this.generateLooser,
            resetGame: this.resetGame,
          }}>
          {this.props.children}
        </MyContext.Provider>
      </>
    );
  }
}

export {
    MyContext,
    MyProvider
}
