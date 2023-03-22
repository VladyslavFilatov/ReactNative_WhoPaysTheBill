import { View, StyleSheet, Alert } from 'react-native';
import React, {useContext} from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Input, Button, ListItem, Text } from '@rneui/base';
import { MyContext } from '../context';
import { ListItemChevron } from '@rneui/base/dist/ListItem/ListItem.Chevron';
import { ListItemContent } from '@rneui/base/dist/ListItem/ListItem.Content';
import { ListItemTitle } from '@rneui/base/dist/ListItem/ListItem.Title';

const stage_one = () => {
  const context = useContext(MyContext);

  const renderPlayers = () => (
    context.state.players.map((item, idx) => (
        <ListItem
            key={idx}
            bottomDivider
            style={{width:'100%'}}
            onLongPress={()=> context.removePlayer(idx)}
        >
          <Text>-</Text>
            <ListItemContent>
                <ListItemTitle>{item}</ListItemTitle>
            </ListItemContent>
        </ListItem>
    ))
  )

  return (
    <>
      <Formik 
        initialValues={{player:''}}
        validationSchema={Yup.object({
          player: Yup.string()
            .min(3, 'Must be more than 3 char')
            .max(15, 'Must be 15 char or less')
            .required('Sorry, the name is required')
        })}
        onSubmit={(values,{ resetForm })=> {
          context.addPlayer(values.player);
          resetForm();
        }}
        >
            { ({ handleChange, handleBlur, handleSubmit, values, touched, errors })=>(
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
            <Input
              placeholder="Add name here"
              leftIcon={<Text>User</Text>}
              inputContainerStyle={{
                marginHorizontal: 50,
                marginTop: 50,
              }}
              renderErrorMessage={errors.player && touched.player}
              errorMessage={errors.player}
              errorStyle={{
                marginHorizontal: 50,
              }}
              onChangeText={handleChange('player')}
              onBlur={handleBlur('player')}
              value={values.player}
            />
            <Button 
              buttonStyle={styles.button}
              title="Add player"
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <View style={{padding:20,width:'100%'}}>
        {
            context.state.players && context.state.players.length > 0 ?
            <>
                <Text>List os players:</Text>
                {renderPlayers()}
                <Button 
                buttonStyle={styles.button}
                title="Get the losser"
                onPress={ ()=> context.next() }
                />
            </>
            :
            null
        }
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#DB3EB1',
    marginTop: 20,
  },
});

export default stage_one;
