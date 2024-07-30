import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Index from '../pages/Index';
import TarefasPage from '../pages/TarefasPage';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Index} options={{ title: 'Início' }} />
        <Tab.Screen name="Tarefas" component={TarefasPage} options={{ title: 'Tarefas' }} />
        {/* Adicione outras telas aqui */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
