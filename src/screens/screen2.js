import React from 'react';
import {View, Text, Button} from 'react-native';

const Screen2 = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Page 2</Text>
      <Button
        title="Go to Page 1"
        onPress={() => navigation.navigate('Screen1')}
      />
    </View>
  );
};

export default Screen2;
