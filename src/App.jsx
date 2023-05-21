import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import { Logo } from "./Comps/TVShowDetails/Logo";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config";
import { TVShowDetail, TVShowDetails } from "./Comps/TVShowDetails/TVShowDetails";
import logoImg from "./Comps/images/logo.png";
import { TVShowListItem } from "./Comps/TVShowListItem/TVShowListItem";
import { TVShowList } from "./Comps/TVShowList/TVShowList";
import { SearchBar } from "./Comps/SearchBar/SearchBar";

export function App() {

const [currentTVShow, setCurrentTVShow] = useState();
const [recommendationList, setRecommendationList] = useState([]);

async function fetchPopularTVShows() {
     try{
        //call the API
        const popTVShowList = await TVShowAPI.fetchPopulars();
        if(popTVShowList.length > 0){
            setCurrentTVShow(popTVShowList[0]);
        }
    } catch (error) {
        alert("An error occurred when looking for Popular Tv Shows");
    }
}

async function fetchRecommendations(tvShowId) {
    //call the API
    const recommendationListResp = await TVShowAPI.fetchRecommendations(tvShowId);
    if(recommendationListResp.length > 0){
        setRecommendationList(recommendationListResp.slice(0,10));
    }
}

async function fetchByTitle(title) {
    //call the API
    const searchResponse = await TVShowAPI.fetchByTitle(title);
    if(searchResponse.length > 0){
        setCurrentTVShow(searchResponse[0]);
    }
}

useEffect(() => {
    fetchPopularTVShows();
}, []);

useEffect(() => {
    if (currentTVShow){
        fetchRecommendations(currentTVShow.id);
    }
}, [currentTVShow]);

//when clicking on any 'You'll probably like...' list item
function updateCurrentTVShow(tvShow){
    setCurrentTVShow(tvShow);
}

return (
    <div className={s.main_container} 
        style={{background: currentTVShow ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover` : "black",}}>
        <div className={s.header}>
            <div className="row">
                <div className="col-4">
                    <Logo img={logoImg} title="What to watch" subtitle="Find a show"/>
                </div>
                <div className="col-md-12 col-lg-4">
                    <SearchBar onSubmit={fetchByTitle}/>
                </div>
            </div>
        </div>
        <div className={s.tv_show_detail}>
            {/*only render if there is a current tv show*/}
                { currentTVShow && <TVShowDetails tvShow={currentTVShow}/>}
            </div>
        <div className={s.recommended_tv_shows}>
                { currentTVShow && <TVShowList onClickItem={updateCurrentTVShow} tvShowList={recommendationList}/>}
        </div>
    </div>
    );
}