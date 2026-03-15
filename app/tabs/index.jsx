import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, FlatList, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";


function Index() {
const typeColors = {
  fire: 'rgba(255, 99, 71, 0.2)',    // Soft Tomato Red
  water: 'rgba(30, 144, 255, 0.2)',  // Soft Ocean Blue
  grass: 'rgba(60, 179, 113, 0.2)',  // Soft Sea Green
  electric: 'rgba(255, 215, 0, 0.3)', // Soft Gold
  ice: 'rgba(173, 216, 230, 0.4)',   // Soft Arctic Blue
  fighting: 'rgba(178, 34, 34, 0.2)', // Soft Crimson
  poison: 'rgba(153, 50, 204, 0.2)',  // Soft Amethyst
  ground: 'rgba(210, 180, 140, 0.4)', // Soft Tan/Earth
  flying: 'rgba(176, 196, 222, 0.5)', // Soft Sky
  psychic: 'rgba(255, 105, 180, 0.2)',// Soft Pink
  bug: 'rgba(154, 205, 50, 0.3)',    // Soft Lime
  rock: 'rgba(112, 128, 144, 0.2)',   // Soft Slate
  ghost: 'rgba(72, 61, 139, 0.2)',    // Soft Deep Purple
  dragon: 'rgba(106, 90, 205, 0.2)',  // Soft Slate Blue
  steel: 'rgba(192, 192, 192, 0.4)',  // Soft Silver
  fairy: 'rgba(255, 182, 193, 0.4)',  // Soft Petal Pink
  normal: 'rgba(211, 211, 211, 0.3)', // Soft Light Gray
};

const typeTextColors = {
  fire: 'rgb(255, 69, 0)',       // Strong OrangeRed
  water: 'rgb(0, 119, 190)',     // Deep Ocean Blue
  grass: 'rgb(34, 139, 34)',     // Dark Forest Green
  electric: 'rgb(184, 134, 11)', // Dark Goldenrod (Yellow is too hard to see)
  ice: 'rgb(70, 130, 180)',      // Steel Blue (Darker than ice)
  fighting: 'rgb(139, 0, 0)',    // Deep Dark Red
  poison: 'rgb(128, 0, 128)',    // Solid Purple
  ground: 'rgb(101, 67, 33)',    // Dark Brown
  flying: 'rgb(70, 130, 180)',   // Deep Sky Blue
  psychic: 'rgb(199, 21, 133)',  // Medium Violet Red
  bug: 'rgb(85, 107, 47)',       // Dark Olive Green
  rock: 'rgb(47, 79, 79)',       // Dark Slate Gray
  ghost: 'rgb(75, 0, 130)',      // Dark Indigo
  dragon: 'rgb(72, 61, 139)',    // Dark Slate Blue
  steel: 'rgb(47, 79, 79)',      // Dark Metal Gray
  fairy: 'rgb(219, 112, 147)',   // Pale Violet Red
  normal: 'rgb(105, 105, 105)',  // Dim Gray
};
   const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
 
async function fetchData() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=30");
    const data = await response.json();

    
    const pokemonsDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          name: pokemon.name,
          url: details.sprites.front_default,
          type: details.types[0].type.name,
          color: details.types[0].type.name
        };
      })
    );

   
    setPokemonList(pokemonsDetails); 
    
  } catch (error) {
     Alert.alert("Oops check your internet connection")
  }
}

  return (
    <SafeAreaView className="flex-1">

      <Text className="text-red-500 text-4xl mt-5 ml-5 font-semibold">
        Pokedex
      </Text>

      <TextInput
        className="text-lg bg-gray-300 w-96 mx-auto h-14 rounded-lg mt-10"
        placeholder="Search your pokemon"
        style ={{ paddingHorizontal: 20 }}
      />

    <FlatList
  data={pokemonList}
  keyExtractor={(item) => item.name}
  numColumns={2}
  contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 20 }}
  renderItem={({ item }) => (
    <Link href={{ pathname:"/details", params: {name : item.name, image: item.url, type: item.type} }} className="w-1/2 p-2" >
      <View 
        style={{ backgroundColor: typeColors[item.type] }}
        className="w-full p-4 rounded-3xl items-center"
      >
        <Text 
          style={{ color: typeTextColors[item.type], fontWeight: '900' }}
          className="text-lg uppercase"
        >
          {item.name}
        </Text>
        <Image 
          source={{ uri: item.url }} 
          className="w-24 h-24 mt-2"
          resizeMode="contain" 
        />
      </View>
    </Link>
   
  )}
/>
    </SafeAreaView>
  );
};

export default Index;