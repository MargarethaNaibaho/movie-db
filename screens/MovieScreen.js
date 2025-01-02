import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';
import { fetchMovieDetail, fetchTrailerKey, image500, movieDetail } from '../api/moviedb';
import Trailer from '../components/trailer';

var {width, height} = Dimensions.get('window')
const ios = Platform.OS == 'ios';
const topMargin = ios ? '' : 'mt-3';

const MovieScreen = () => {
    const {params: item} = useRoute();
    const navigation = useNavigation();

    let movieName = "Wicked: Part 1";
    const [cast, setCast] = useState([1, 2, 3, 4, 5]);
    const [similarMovies, setSimilarMovies] = useState([1, 2, 3, 4, 5]);
    
    const [details, setDetails] = useState({});
    const [videoUrl, setVideoUrl] = useState('');
    
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // console.log(item.id)
        getMovieDetail(item.id)
        getTrailerKey(item.id)
    }, [item]);

    const getMovieDetail = async(id) => {
        const data = await fetchMovieDetail(id);
        console.log('got movie detail: ', item.id, ': ', data)
        if(data) setDetails(data) 
        setIsLoading(false)
    }

    const getTrailerKey = async(id) => {
        const data = await fetchTrailerKey(id);
        console.log('got trailer key: ', data.results)
        
        const trailerData = data.results.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
        )
        // console.log(data.results)

        if(trailerData) {
            setVideoUrl(`https://www.youtube.com/embed/${trailerData.key}`)
        }
    }

    return (
        <ScrollView
            contentContainerStyle={{paddingBottom: 20}}
            className="flex-1 bg-neutral-900"
        >
            {
                isLoading ? (
                    <Loading />
                ) : (
                    <>
                    <View className="w-full">
                        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4">
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

                        <View>
                            <Image 
                                source={{ uri: image500(details.poster_path) }}
                                style={{width, height: height * 0.55}}
                            />
                            <LinearGradient
                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={{width, height: height * 0.4}}
                                start={{x: 0.5, y: 0}}
                                end={{x: 0.5, y: 1}}
                                className="absolute bottom-0"
                            />
                        </View>
                    </View>

                    {/* movie details */}
                    <View style={{marginTop: -(height * 0.09)}} className="gap-3">
                        {/* title */}
                        <Text className="text-white font-ibold text-center text-5xl tracking-wider">{details.title}</Text>

                        {/* description */}
                        <Text className="text-neutral-400 font-isemibold text-base text-center">
                            Released • {details.release_date.substring(0, 4)} • {details.runtime} mins
                        </Text>

                        {/* genres */}
                        <View className="flex-row justify-center mx-4 gap-2">
                            {
                                details.genres.map((genre, index) => {
                                    return (
                                        <Text key={index} className="text-neutral-400 font-isemibold text-base text-center">
                                            {genre.name} {index !== details.genres.length - 1 ? ' •' : ''}
                                        </Text>
                                    )
                                })
                            }
                        </View>

                        {/* description */}
                        <Text className="text-neutral-400 mx-4 tracking-wider font-iregular">
                        {details.overview}
                        </Text>
                    </View>

                    {/* trailer */}
                    <Trailer trailer={videoUrl} />

                    {/* casts */}
                    {/* <Cast cast={cast} navigation={navigation}></Cast> */}

                    {/* similar movies */}
                    {/* <MovieList title={"Similar Movies"}  hideSeeAll={true} data={similarMovies}/> */}
                    </>
                )
            }
            
        </ScrollView>
    )
}

export default MovieScreen