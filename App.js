import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default function App() {

  var inital = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  const [gameState, newGameState] = useState(inital);
  const [currentPlayer, newCurrentPlayer] = useState(1);
  const [player1Score, newPlayer1Score] = useState(0);
  const [player2Score, newPlayer2Score] = useState(0);

  const renderIcon = (row, col) => {
    var val = gameState[row][col]
    switch (val) {
      case 1:
        return <Icon name="close" style={styles.tileX} />
      case -1:
        return <Icon name="circle-outline" style={styles.tileO} />
      default: return <View />
    }
  }

  //Function to decide the winner...returns 1 if X wins...return -1 if 0 wins
  var getWinner = () => {
    var sum;
    //For checking row sum
    for (var i = 0; i < 3; i++) {
      sum = gameState[i][0] + gameState[i][1] + gameState[i][2];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }
    //For checking column sum
    for (var i = 0; i < 3; i++) {
      sum = gameState[0][i] + gameState[1][i] + gameState[2][i];
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    //For checking left diagnol sum
    sum = gameState[0][0] + gameState[1][1] + gameState[2][2];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    //For checking right diagnol sum
    sum = gameState[0][2] + gameState[1][1] + gameState[2][0];
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    return 0;//In case of no winners
  }

  const onTilePress = (row, col) => {
    //To not allow the value to change when the same tile is clicked again
    var value = gameState[row][col];
    if (value !== 0) { return; }

    //To set the correct tile
    var arr = gameState.slice();//Creating a copy of the present state

    arr[row][col] = currentPlayer;
    newGameState(arr);

    //Switch to next player
    var nextPlayer = (currentPlayer == 1) ? -1 : 1;
    newCurrentPlayer(nextPlayer);

    var winner = getWinner();
    if (winner == 1) {
      Alert.alert("Player 1  has won !!");
      newGameState(inital);
      newCurrentPlayer(1);
      newPlayer1Score(player1Score + 1);
    }
    else if (winner == -1) {
      Alert.alert("Player 2  has won !!");
      newGameState(inital);
      newCurrentPlayer(1);
      newPlayer2Score(player2Score + 1);
    }
    else {
      var flag = 1
      for (var i = 0; i < 3; i++) {
        if (gameState[i][0] == 0 || gameState[i][1] == 0 || gameState[i][2] == 0)
          flag = 0;
      }
      if (flag == 1) {
        Alert.alert("It's a draw !!");
        newGameState(inital);
        newCurrentPlayer(1);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
          {renderIcon(0, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0 }]}>
          {renderIcon(0, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(0, 2)} style={[styles.tile, { borderRightWidth: 0, borderTopWidth: 0 }]}>
          {renderIcon(0, 2)}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0 }]}>
          {renderIcon(1, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(1, 1)} style={[styles.tile, {}]}>
          {renderIcon(1, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(1, 2)} style={[styles.tile, { borderRightWidth: 0 }]}>
          {renderIcon(1, 2)}
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => onTilePress(2, 0)} style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}>
          {renderIcon(2, 0)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(2, 1)} style={[styles.tile, { borderBottomWidth: 0 }]}>
          {renderIcon(2, 1)}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTilePress(2, 2)} style={[styles.tile, { borderRightWidth: 0, borderBottomWidth: 0 }]}>
          {renderIcon(2, 2)}
        </TouchableOpacity>
      </View>
      <View style={styles.playerContainer1}>
        <Text style={styles.textFormat}>PLAYER 1 IS X</Text>
        <Text style={styles.textFormat}>SCORE : {player1Score}</Text>
      </View>
      <View style={styles.playerContainer2}>
        <Text style={[styles.textFormat,{color:'black'}]}>PLAYER 2 IS O</Text>
        <Text style={[styles.textFormat,{color:'black'}]}>SCORE : {player2Score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightseagreen',
  },
  tile: {
    borderWidth: 7,
    borderColor : "#3d8f88",
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  tileX: {
    color: "#263238",
    fontSize: 60,
  },
  tileO: {
    color: "#fee2b8",
    fontSize: 60,
  },
  playerContainer1: {
    marginTop: 20,
    backgroundColor: '#263238',
    borderRadius:10,
    width: 300,
    height: 75,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  playerContainer2: {
    marginTop: 20,
    backgroundColor: '#fee2b8',
    borderRadius:10,
    width: 300,
    height: 75,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  textFormat: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  }
});
