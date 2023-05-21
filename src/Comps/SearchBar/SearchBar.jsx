import { useState } from "react";
import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";

export function SearchBar({ onSubmit }){

const [searchValue, setSearchValue] = useState("");

    function submit(e){
        if(e.key == "Enter" && e.target.value.trim() != ""){
            onSubmit(e.target.value)
            //reset search bar contents
            setSearchValue("");
        }
    }

    function handleSearchChange(e){
        setSearchValue(e.target.value);
    }

    return (
        <>
            <SearchIcon size={27} className={s.icon} />
            <input 
                onKeyUp={submit}
                onChange={handleSearchChange}
                className={s.input} 
                type="text" 
                value={searchValue} //store search bar value is state
                placeholder="Search a show" />
        </>
    )
}