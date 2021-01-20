import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingScreen from './screens/SettingScreen';

class App extends Component {
  render() {
    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const SettingScreenNav = () => (
      <Stack.Navigator>
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
    );

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
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={30} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#2B7A78',
          inactiveTintColor: 'gray',
        }}
      >
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="Deck" component={DeckScreen} />
          <Tab.Screen name="Review" component={ReviewScreen} />
        </Tab.Navigator>
      );

    return (
      <PaperProvider>
        <StatusBar style="light" backgroundColor="rgba(0,0,0,0.3)" />
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ title: 'Welcome Screen' }}
            />
            <Stack.Screen name="Auth" component={AuthScreen} />
            <Stack.Screen name="TabNav" component={MainScreenTabNav} />
            <Stack.Screen name="SettingsStack" component={SettingScreenNav} />
          </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
    );
  }
}
export default App;
