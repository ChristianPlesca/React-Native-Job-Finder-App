import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers/';
import { initFirebase } from './config/firebaseAuthConfig';
import LogInScreen from './screens/LogInScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingScreen from './screens/SettingScreen';
import SignUpScreen from './screens/SignUpScreen';
import MarkersScreen from './screens/MarkersScreen';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2B7A78',
    accent: 'yellow',
    placeholder: '#C5C6C7',
    text: '#C5C6C7',
  },
};

class App extends Component {
componentDidMount() {
    initFirebase();
  }
  render() {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const SettingScreenNav = () => (
      <Stack.Navigator>
        <Stack.Screen name="SettingScreen" options={{ title: 'Back' }} component={SettingScreen} />
      </Stack.Navigator>
    );

    const store = createStore(reducers, {}, compose(applyMiddleware(ReduxThunk)));

    const MainScreenTabNav = () => (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Map') {
              iconName = focused
                ? 'ios-map'
                : 'ios-map-outline';
            } else if (route.name === 'Deck') {
                iconName = focused ? 'albums' : 'albums-outline';
            } else if (route.name === 'Review') {
              iconName = focused ? 'documents' : 'documents-outline';
            } else if (route.name === 'Markers') {
              iconName = focused ? 'md-location' : 'md-location-outline';
            }
            return <Ionicons name={iconName} size={30} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#2B7A78',
          inactiveTintColor: 'gray',
        }}
      >
          <Tab.Screen name="Map" options={{ title: 'Location' }} component={MapScreen} />
          <Tab.Screen name="Markers" options={{ title: 'Results' }} component={MarkersScreen} />
          <Tab.Screen name="Deck" options={{ title: 'Review Jobs' }} component={DeckScreen} />
          <Tab.Screen name="Review" options={{ title: 'Apply Jobs' }} component={ReviewScreen} />
        </Tab.Navigator>
    );
    

    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <StatusBar style="light" backgroundColor="rgba(0,0,0,0.3)" />
          <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen
                name="Welcome"
                component={WelcomeScreen}
                options={{ title: 'Welcome Screen' }}
              />
              <Stack.Screen name="LogInScreen" component={LogInScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="TabNav" component={MainScreenTabNav} />
              <Stack.Screen name="SettingsStack" component={SettingScreenNav} />
            </Stack.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </Provider>
    );
  }
}
export default App;
