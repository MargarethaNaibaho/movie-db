import axios from 'axios';
import { apiKey } from '../constants';

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

const movieDetail = id => id ?  `${apiBaseUrl}/movie/${id}?api_key=${apiKey}` : null;
const trailerKey = id => id ?  `${apiBaseUrl}/movie/${id}/videos?api_key=${apiKey}` : null;

export const fallbackMoviePoster = 'https://img.freepik.com/free-vector/flat-design-movie-theater-background_23-2150998489.jpg?t=st=1735823649~exp=1735827249~hmac=09a7f96dfff0c0db240a8a3ea89db6b4a5d768f7b9b7547f8df9463771405515&w=996';
export const fallbackPersonImage = 'https://images.ctfassets.net/1wryd5vd9xez/6imn4PsoUBr6I9Hs8jWxk4/b28965e1afec63588266cf42ba5178ae/https___cdn-images-1.medium.com_max_2000_1_7hkI-ZKsglnbjxCRV1bMZA.png';

const apiCall = async(endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try{
        const response = await axios.request(options)
        return response.data;

    } catch(error){
        console.log('error: ', error)
        return {}
    }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndPoint);
}

export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndPoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndPoint);
}

export const fetchMovieDetail = (id) => {
    return apiCall(movieDetail(id));
}

export const fetchTrailerKey = (id) => {
    return apiCall(trailerKey(id));
}
