import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function Cast({cast, navigation}) {
    let personName = "Ariana Grande";
    let characterName = "Glinda";

    return (
        <View className="my-6">
            <Text className="text-white text-lg font-ibold mx-4 mb-5">Top Casts</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{paddingHorizontal: 15}}
            >
        
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                className="mr-4 items-center gap-y-4"
                                onPress={() => navigation.navigate('Person', person)}
                            >
                                <View className="overflow-hidden border rounded-full border-neutral-500 bor">
                                    <Image 
                                        source={require('../assets/ariana.jpg')}
                                        className="rounded-full w-20 h-20"
                                    />
                                </View>

                                <View className="items-center">
                                    <Text className="text-white text-xs mt-1 font-iregular">
                                        {
                                            characterName.length > 10 ? characterName.slice(0, 10) + '...' : characterName
                                        }
                                    </Text>
                                    <Text className="text-neutral-400 text-xs mt-1 font-iregular">
                                        {
                                            personName.length > 10 ? personName.slice(0, 10) + '...' : personName
                                        }
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}