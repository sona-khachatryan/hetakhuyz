import { useState,useEffect, useRef } from "react"
import "./search.style.scss"
import SearchSlice from "./searchslice/SearchSlice"
import axios from "axios"
import { Link } from "react-router-dom"
import { address } from "../../repetitiveVariables/variables"
import Pagination from "../pagination/Pagination.jsx";


const Search = () => {
    const inputRef = useRef()
    const [search,setSearch] = useState()
    const [searchData,setSearchData] = useState([])
    const [contentBeginning,setContentBegining] = useState(0);
    const containerRef = useRef(null)
    
    useEffect(()=>{
        (async () => {
            try { 
                if(search === "") return;
                const {data} = await axios.get(`${address}/news/search?search=${search}`)
                setContentBegining(0)
                setSearchData(data)
            } catch (error) {
                console.log(error)
            }
        })()
    },[search])

    useEffect(()=>{
        containerRef.current.scrollIntoView({behavior:"smooth", block: "start"})
    },[contentBeginning])

    return (
        <main ref={containerRef} className="search_container">
            <div className="input_container">
                <input ref={inputRef} type="text" placeholder="Որոնել ․․․" />
                <button onClick={()=>{setSearch(inputRef.current.value.trim())}}><img src="/img/VectorSearch.png" alt="Որոնել" /></button>
            </div>
            {search && <div className="search_result">
                <p><span>{`«${search}»`}</span>որոնման արդյունքերը</p>
                <p>{`${searchData.length ? searchData.length : 0} արդյունք`}</p>
            </div>}
            <hr />

            {searchData.length === 0 ? search && <h2>Արդյունք չի գտնվել</h2> : searchData &&
            <>
                {searchData.slice(contentBeginning, contentBeginning+6).map((data, key) =>
                    <Link key={key} to={`/news/${data?.id}`}>
                        <SearchSlice data={data}/>
                    </Link>
                )}

                <div className="flex_container search_paginate_container">
                    <Pagination totalElements={searchData?.length} contentBeginning={contentBeginning} setContentBeginning={setContentBegining} elementsPerPage={6}/>
                </div>
            </>
            }
        </main>
    )
}

export default Search