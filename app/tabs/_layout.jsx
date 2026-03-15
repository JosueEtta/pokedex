import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false, 
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e5e5',
        }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="deepDetail"
        options={{
          title: "Deep Detail",
          tabBarIcon: ({ color }) => (
            <Image className="w-6 h-6" source={require('../../assets/images/pokeball.png')} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="quiz"
        options={{    
          title: "Quiz",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="question-circle" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}