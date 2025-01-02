import { View, Text, Dimensions, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'

var {width, height} = Dimensions.get('window')

export default function SearchScreen() {
    const navigation = useNavigation();
    const [results, setResults] = useState([1, 2, 3, 4])
    const [isLoading, setIsLoading] = useState(false);
    
    let movieName = "Wicked: Part 1"

    return (
        <SafeAreaView className="bg-neutral-800 flex-1">
            <View className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full">
                <TextInput 
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className="py-4 pl-6 flex-1 text-lg font-isemibold text-white tracking-wider"
                />
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home')}
                    className="rounded-full p-2 m-4 bg-neutral-500"
                >
                    <XMarkIcon size={25} color={"white"} />
                </TouchableOpacity>
            </View>

            {/* hasilnya */}
            {
                isLoading ? (
                    <Loading />
                ) : 
                    results.length > 0 ? (
                        <ScrollView
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingHorizontal: 15}}
                            className=""
                        >
                            <Text className="text-white text-lg font-isemibold ml-1 mb-4">Results ({results.length})</Text>
                            <View className="flex-row justify-between flex-wrap">
                                {
                                    results.map((item, index) => {
                                        return (
                                            <TouchableWithoutFeedback
                                                key={index}
                                                onPress={() => navigation.push('Movie', item)}
                                            >
                                                <View className="gap-x-2 mb-8">
                                                    <Image 
                                                        className="rounded-3xl"
                                                        source={require('../assets/wicked.jpg')}
                                                        style={{
                                                            width: width * 0.44,
                                                            height: height * 0.3
                                                        }}
                                                    />
                                                    <Text className="text-neutral-300 text-lg font-isemibold mt-4 ml-1">
                                                        {
                                                            movieName.length > 22 ? movieName.slice(0, 22) + '...' : movieName
                                                        }
                                                    </Text>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    })
                                }
                            </View>
                        </ScrollView>
                    ) : (
                        <View className="flex-row justify-center">
                            <Image
                                source={require('../assets/movieTime.png')}
                                className="h-96 w-96"
                            />
                        </View>
                    )
                
            }
            
        </SafeAreaView>
    )
}