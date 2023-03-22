import { View, StyleSheet, Alert } from 'react-native';
import React, { useContext } from 'react';
import { MyContext } from '../context';
import { Button, Input, Text } from '@rneui/base';



const stage_two = () => {
  const context = useContext(MyContext);
  return (
    <>
      <Text
        style={{
          fontFamily: 'Pacifico-Regular',
          color: '#db3eb1',
          textDecorationLine: 'underline',
          textDecorationColor: '#41b6e6',
          fontSize: 30,
        }}>
        Who pays the bill ?
      </Text>
      <Text>The looser is</Text>
      <Text style={styles.loserWrapper}>
        {context.state.result}
      </Text>
      <Button
        buttonStyle={styles.button}
        title="Try again"
        onPress={ () => context.getNewLooser()}
      />
      <Button
        buttonStyle={styles.button}
        title="Start over"
        onPress={ () => context.resetGame()}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loserWrapper: {
    fontSize: 30,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#41B6E6',
    marginTop: 20,
  },
});

export default stage_two;
