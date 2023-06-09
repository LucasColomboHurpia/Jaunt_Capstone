import React from 'react';
import {View, Text, Button} from 'react-native';

const Screen1 = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Page 1</Text>
      <Button
        title="Go to Page 2"
        onPress={() => navigation.navigate('Screen2')}
      />
    </View>
  );
};

export default Screen1;
