
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './src/stack/RootStack';



const App: () => React.Node = () => {
  return <NavigationContainer>
    <RootStack/>
  </NavigationContainer>
  
};

export default App;
