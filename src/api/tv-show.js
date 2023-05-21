import axios from "axios";
import { FAKE_POPULARS, FAKE_RECOMMENDATIONS } from "./fake_data";
import { BASE_URL, API_KEY_PARAM } from "../config";


export class TVShowAPI {
    static async fetchPopulars(){
    //perfom the API call
    const response = await axios.get(`${BASE_URL}trending/tv/week${API_KEY_PARAM}`);

    return response.data.results;
    //return FAKE_POPULARS;

    }

    static async fetchRecommendations(tvShowId){
        //perfom the API call
        const response = await axios.get(`${BASE_URL}tv/${tvShowId}/recommendations${API_KEY_PARAM}`);
    
        return response.data.results;
        //return FAKE_RECOMMENDATIONS;

    }

    static async fetchByTitle(title){
        //perfom the API call
        const response = await axios.get(`${BASE_URL}search/tv${API_KEY_PARAM}&query=${title}`);
    
        return response.data.results;
        //return FAKE_RECOMMENDATIONS;

    }
}