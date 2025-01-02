import { View, Text, Platform, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies'
import MovieList from '../components/movieList'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb'

const ios = Platform.OS == 'ios';

export default function HomeScreen() {
    const [trending, setTrending] = useState([]);
    const [upcoming, setUpcoming] = useState([]);
    const [topRated, setTopRated] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const navigation = useNavigation();

    useEffect(() => {
        getTrendingmovies();
        getUpcomingMovies();
        getTopRatedMovies();
    }, []);

    const getTrendingmovies = async() => {
        const data = await fetchTrendingMovies();
        // console.log('got trending movies: ', data)

        if(data && data.results) setTrending(data.results);
        setIsLoading(false);
    }

    const getUpcomingMovies = async() => {
        const data = await fetchUpcomingMovies();
        console.log('got upcoming movies: ', data)

        if(data && data.results) setUpcoming(data.results);
        // setIsLoading(false);
    }

    const getTopRatedMovies = async() => {
        const data = await fetchTopRatedMovies();
        // console.log('got top rated movies: ', data)

        if(data && data.results) setTopRated(data.results);
        // setIsLoading(false);
    }

    return (
        <View className="flex-1 bg-neutral-800">
            {/* search bar dan logo */}
            <SafeAreaView className={ios ? "-mb-2 mt-4" : "mb-3 mt-4"}>
                <StatusBar style='light'/>
                <View className="flex-row justify-between items-center mx-4">
                    <Bars3CenterLeftIcon size="30" strokeWidth={2} color={"white"}/>
                    {/* <Text className="text-white text-3xl font-bold">Movies</Text> */}
                    <Image source={require("../assets/logo.png")} className="w-auto h-8" resizeMode='contain'/>
                    <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                        <MagnifyingGlassIcon size={30}  strokeWidth={2} color={"white"} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {
                isLoading ? (
                    <Loading />
                ) : (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{paddingBottom: 10}}
                    >
                        {/* trending movies carousel */}
                        { trending.length > 0 && <TrendingMovies data={trending}/> }

                        {/* upcoming movies row */}
                        { upcoming.length > 0 && <MovieList title="Upcoming" data={upcoming}/> }

                        {/* top rated movies */}
                        { topRated.length > 0 && <MovieList title="Top Rated" data={topRated}/> }
                    </ScrollView>
                )
            }

        </View>
    )
}