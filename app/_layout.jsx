import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="tabs" options={{ title: "Pokedex", headerShown: false }} />
       <Stack.Screen
        name="details"
        options={{
          title: "Details",
          headerBackButtonDisplayMode: 'minimal',
          presentation: 'formSheet', 
        }}
      />
    </Stack>
  );
}
