import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

var {width, height} = Dimensions.get('window')

export default function MovieList({title, data, hideSeeAll}) {
  let movieName = "Wicked: Part 1";
  const navigation = useNavigation();

  return (
    <View className="mb-8 gap-2">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-2xl font-ibold mb-3">{title}</Text>

        {
          !hideSeeAll && (
            <TouchableOpacity>
                {/* See All */}
                <Text className="text-lg text-yellow-200 font-ilight">See All</Text>
            </TouchableOpacity>
          )

        }
        
      </View>

      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
          data.map((item, index) => {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => navigation.push('Movie', item)}
              >
                <View className="gap-1 mr-4">
                  <Image
                    source={require('../assets/wicked.jpg')}
                    className="rounded-3xl"
                    style={{
                      width: width * 0.33,
                      height: height * 0.22
                    }}
                  />
                  <Text className="text-neutral-300 ml-1 text-lg font-ibold">
                    {
                      movieName.length > 14  ? movieName.slice(0, 14) + '...' : movieName
                    }
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            )
          })
        }
      </ScrollView>
    </View>
  )
}