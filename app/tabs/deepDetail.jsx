import { useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function deepDetail() {

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
    electric: 'rgb(184, 134, 11)', // Dark Goldenrod
    ice: 'rgb(70, 130, 180)',      // Steel Blue
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
    const params = useLocalSearchParams();

  return (
    <SafeAreaView>
     <ScrollView>
       {/* Pokemon card — same rounded-3xl card style as Index */}
              <View
                style={{ backgroundColor: typeColors[params.type] ?? 'rgba(211,211,211,0.3)' }}
                className="rounded-3xl p-6 items-center"
              >
                <Image
                  source={{ uri: params.image }}
                  className="w-48 h-48"
                  resizeMode="contain"
                />
                {/* Pokemon name — same uppercase bold style as Index */}
                <Text
                  style={{ color: typeTextColors[params.type] ?? 'rgb(105,105,105)', fontWeight: '900' }}
                  className="text-3xl uppercase mt-2"
                >
                  {params.name}
                </Text>
      
                {/* Type badge */}
                <View
                  style={{ backgroundColor: typeTextColors[params.type] ?? 'rgb(105,105,105)' }}
                  className="mt-3 px-5 py-1 rounded-full"
                >
                  <Text className="text-white text-sm font-bold uppercase tracking-widest">
                    {params.type}
                  </Text>
                </View>
              </View>
      
              {/* Description section */}
              <View className="mt-5 bg-gray-100 rounded-3xl p-5">
                <Text className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">
                  About
                </Text>
                <Text className="text-gray-600 text-base leading-relaxed">
                  {params.details ?? "Loading..."}
                </Text>
              </View>
              
              
     </ScrollView>
     </SafeAreaView>
  )
}