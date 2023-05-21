import { StarFill, StarHalf, Star as StarEmpty } from "react-bootstrap-icons"

export function FiveStarRating({ rating }){

    const starList = [];
    //round down of the vote average
    const starFillCount = Math.floor(rating);
    //get the decimal value for half stars
    const halfStar = rating - parseInt(rating) >= 0.5;
    //empty stars
    const emptyStars = 5 - starFillCount - (halfStar ? 1 : 0);
    //fill array with correct icons
    for (let i = 1; i <=starFillCount; i++){
        starList.push(<StarFill key={"star-fill" + i}/>);
    }
  //fill array with any half stars
    if (halfStar){
        starList.push(<StarHalf key={"star-half"}/>);
    }
    //fill array with any empty stars
    for (let i = 1; i <=emptyStars; i++){
        starList.push(<StarEmpty key={"star-empty"}/>);
    }

    return (
    <div>
        {starList}
    </div>
    );
}