import { View, Text, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Dimensions, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

var {width, height} = Dimensions.get('window')

export default function MovieList({title, data, hideSeeAll}) {
  console.log('ini dari movieList: ',data)
  let movieName = "Wicked: Part 1";
  const navigation = useNavigation();

  return (
    <View className="mb-8 gap-2">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white text-2xl font-bold mb-3">{title}</Text>

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
                    source={{ uri: image500(item.poster_path) }}
                    className="rounded-3xl"
                    style={{
                      width: width * 0.33,
                      height: height * 0.22
                    }}
                  />
                  <Text className="text-neutral-300 ml-1 text-lg font-ibold">
                    {
                      item.original_title.length > 14  ? item.original_title.slice(0, 14) + '...' : item.original_title
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