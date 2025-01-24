import { View, Text } from 'react-native'
import React from 'react'
import Home from './Screens/Home.js'
// import Main_stack from './Navigation/Stack_navigation/Stack.js'
import Stack_navigation from './Navigation/Stack_navigation/Stack.js'
import Splash from './Screens/Auth/Splash.js'

const App = () => {
  return (
    <Stack_navigation/>
    // <Splash/>
  )
}

export default App