import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "../../global.css";

 const typeColors = {
    fire: 'rgba(255, 99, 71, 0.2)',
    water: 'rgba(30, 144, 255, 0.2)',
    grass: 'rgba(60, 179, 113, 0.2)',
    electric: 'rgba(255, 215, 0, 0.3)',
    ice: 'rgba(173, 216, 230, 0.4)',
    fighting: 'rgba(178, 34, 34, 0.2)',
    poison: 'rgba(153, 50, 204, 0.2)',
    ground: 'rgba(210, 180, 140, 0.4)',
    flying: 'rgba(176, 196, 222, 0.5)',
    psychic: 'rgba(255, 105, 180, 0.2)',
    bug: 'rgba(154, 205, 50, 0.3)',
    rock: 'rgba(112, 128, 144, 0.2)',
    ghost: 'rgba(72, 61, 139, 0.2)',
    dragon: 'rgba(106, 90, 205, 0.2)',
    steel: 'rgba(192, 192, 192, 0.4)',
    fairy: 'rgba(255, 182, 193, 0.4)',
    normal: 'rgba(211, 211, 211, 0.3)',
  };

  const typeTextColors = {
    fire: 'rgb(255, 69, 0)',
    water: 'rgb(0, 119, 190)',
    grass: 'rgb(34, 139, 34)',
    electric: 'rgb(184, 134, 11)',
    ice: 'rgb(70, 130, 180)',
    fighting: 'rgb(139, 0, 0)',
    poison: 'rgb(128, 0, 128)',
    ground: 'rgb(101, 67, 33)',
    flying: 'rgb(70, 130, 180)',
    psychic: 'rgb(199, 21, 133)',
    bug: 'rgb(85, 107, 47)',
    rock: 'rgb(47, 79, 79)',
    ghost: 'rgb(75, 0, 130)',
    dragon: 'rgb(72, 61, 139)',
    steel: 'rgb(47, 79, 79)',
    fairy: 'rgb(219, 112, 147)',
    normal: 'rgb(105, 105, 105)',
  };

function Index() {
 
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = useCallback(({ item }) => (
  <Link href={{ pathname: "/details", params: { name: item.name, image: item.url, type: item.type } }} className="w-1/2 p-2">
    <View
      style={{ backgroundColor: typeColors[item.type] }}
      className="w-full p-4 rounded-3xl items-center"
    >
      <Text style={{ color: typeTextColors[item.type], fontWeight: '900' }} className="text-lgss uppercase">
        {item.name}
      </Text>
      <Image source={{ uri: item.url }} className="w-24 h-24 mt-2" resizeMode="contain" />
    </View>
  </Link>
), []);

  async function fetchData() {
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=30&offset=${offset}`);
      const data = await response.json();

      const pokemonsDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            name: pokemon.name,
            url: details.sprites.front_default,
            type: details.types[0]?.type.name ?? 'normal',
            color: details.types[0]?.type.name ?? 'normal',
          };
        })
      );

      setPokemonList(prev => [...prev, ...pokemonsDetails]);
      setOffset(prev => prev + 30);

    } catch (error) {
      Alert.alert("Oops check your internet connection");
    } finally {
      setLoading(false);
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
        style={{ paddingHorizontal: 20 }}
      />

      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.name}
        numColumns={2}
        contentContainerStyle={{ paddingHorizontal: 10, paddingTop: 20 }}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator size="large" color="red" className="my-4" /> : null
        }
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

export default Index;