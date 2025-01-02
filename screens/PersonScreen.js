import { View, Text, Dimensions, Platform, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { useNavigation } from '@react-navigation/native'
import MovieList from '../components/movieList'
import Loading from '../components/loading'

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios'
const verticalMargin = ios? '' : ' mt-16'

export default function PersonScreen() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1, 2, 3,  4 ,5])
    const [isLoading, setIsLoading] = useState(false);

    const navigation = useNavigation();

    return (
        <ScrollView 
            className="flex-1 bg-neutral-900"
            contentContainerStyle={{paddingBottom: 20}}
        >
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                    {/* back button */}
                    <SafeAreaView className={`z-20 w-full flex-row justify-between items-center px-4 ${verticalMargin}`}>
                        <TouchableOpacity
                            className="rounded-full p-2 bg-blue-500"
                            onPress={() => navigation.goBack()}
                        >
                            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                            <HeartIcon size={35} color={isFavorite ? "red": "white"}/>
                        </TouchableOpacity>
                    </SafeAreaView>

                    {/* person details */}
                    <View className="">
                        <View className="items-center">
                            <View 
                                className="flex-row justify-center h-80 w-80 items-center"
                                style={{
                                    shadowColor: 'white',
                                    shadowOpacity: 1,
                                    elevation: 20,
                                    borderRadius: 150,

                                }}
                            >
                                <View className="overflow-hidden rounded-full h-72 w-72 border-2 border-neutral-200">
                                    <Image 
                                        source={require('../assets/ariana.jpg')}
                                        style={{height: height * 0.43, width: width * 0.74}}
                                    />
                                </View>
                            </View>
                        </View>
                        

                        <View className="mt-6">
                            <Text className="text-white font-ibold text-3xl text-center">
                                Ariana Grande
                            </Text>
                            <Text className="text-neutral-500 font-iregular text-base text-center">
                                New York, United States of America
                            </Text>
                        </View>

                        <View className="mx-4 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full">
                            <View className="border-r-2 border-r-neutral-400 pr-4 items-center">
                                <Text className="text-white font-isemibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm font-iregular">Female</Text>
                            </View>

                            <View className="border-r-2 border-r-neutral-400 px-4 items-center">
                                <Text className="text-white font-isemibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm font-iregular">2002-03-14</Text>
                            </View>

                            <View className="border-r-2 border-r-neutral-400 px-4 items-center">
                                <Text className="text-white font-isemibold">Known for</Text>
                                <Text className="text-neutral-300 text-sm font-iregular">Singing</Text>
                            </View>

                            <View className="px-4 items-center">
                                <Text className="text-white font-isemibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm font-iregular">64.31</Text>
                            </View>
                        </View>

                        <View className="my-6 mx-4 gap-y-2">
                            <Text className="text-white text-lg font-ibold">Biography</Text>
                            <Text className="text-neutral-400 tracking-wider font-iregular">
                                Ariana Grande-Butera was born on June 26, 1993, in Boca Raton, Florida. She is the daughter of Joan Grande, the Brooklyn-born CEO of Hose-McCann Communications, a manufacturer of marine communications equipment owned by the Grande family since 1964, and Edward Butera, a graphic design firm owner in Boca Raton.
                            </Text>
                        </View>

                        {/* movies list */}
                        <MovieList data={personMovies} title={"Movies"} hideSeeAll={true} />
                    </View>
                    </>
                )
            }
        </ScrollView>
    )
}