import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Quiz() {
  const [pokemons, setPokemon] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [selectedOption, setSelectedOption] = useState(false);
  const [loadingNewRound, setLoadingNewRound] = useState(false);

  useEffect(() => {
    loadNewPokemon();
  }, []);

  const speak = (text) => {
    Speech.speak(text, { language: "en-US", pitch: 0.8, rate: 0.85 });
  };

const loadNewPokemon = async () => {
    setLoadingNewRound(true);
    setSelectedOption(false); 
    setImageLoaded(false);    
    
    const randomId = Math.floor(Math.random() * 1025) + 1;
    await fetchPokemon(randomId);
    
    // Move the speech to the VERY end of the fetch process
    setLoadingNewRound(false);
    speak("Who's that Pokémon?");
  };

  async function fetchPokemon(correctId) {
    try {
      const ids = [
        correctId, 
        Math.floor(Math.random() * 1025) + 1, 
        Math.floor(Math.random() * 1025) + 1
      ];

      const responses = await Promise.all(ids.map(id => fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)));
      const data = await Promise.all(responses.map(res => res.json()));

      const pokemonData = data.map((item, index) => ({
        name: item.name,
        isCorrect: index === 0,
        image: item.sprites.other['official-artwork'].front_default, 
      }));

      // The Fisher-Yates Shuffle
      for (let i = pokemonData.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pokemonData[i], pokemonData[j]] = [pokemonData[j], pokemonData[i]];
      }

      setPokemon(pokemonData);
      // Don't set ImageLoaded(true) here; let the <Image> onLoad handle it!
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  }

  const handleChoice = (pokemon) => {
    if (selectedOption || loadingNewRound) return; // Prevent double taps

    setSelectedOption(true); // Reveal the image

    if (pokemon.isCorrect) {
      speak(`Correct! It's ${pokemon.name}!`);
    } else {
      const correct = pokemons.find(p => p.isCorrect);
      speak(`Wrong! It is actually ${correct.name}!`);
    }

    // Wait for the user to see the result, then load next
    setTimeout(() => {
      loadNewPokemon();
    }, 2500);
  };

  const currentImage = pokemons.find(p => p.isCorrect)?.image;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Text className="text-2xl font-bold text-center mt-10 tracking-widest uppercase">
        Who's that Pokémon?
      </Text>

      <View className="items-center justify-center mt-6 h-64">
        {!imageLoaded && (
          <View className="absolute z-10">
            <ActivityIndicator size="large" color="red" />
          </View>
        )}
        
        {currentImage && (
          <Image 
            key={currentImage} // Force re-render when image changes
            source={{ uri: currentImage }}
            className="w-56 h-56"
            style={{
              tintColor: selectedOption ? undefined : '#000000',
              opacity: imageLoaded ? 1 : 0
            }}
            onLoad={() => setImageLoaded(true)}
            resizeMode="contain"
          />
        )}
      </View>

      <View className="px-6 mt-6 gap-3">
        {pokemons.map((pokemon, index) => (
          <TouchableOpacity
            key={`${pokemon.name}-${index}`}
            activeOpacity={0.8}
            disabled={selectedOption}
            onPress={() => handleChoice(pokemon)}
            className={`w-full py-4 px-6 rounded-2xl border ${
              selectedOption && pokemon.isCorrect ? 'bg-green-100 border-green-500' : 'bg-white border-gray-200'
            }`}
          >
            <Text className="text-center font-bold tracking-widest uppercase text-sm">
              {pokemon.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}