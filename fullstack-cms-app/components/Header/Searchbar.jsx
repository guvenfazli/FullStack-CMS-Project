import { useState, useRef } from "react"
import Link from "next/link"


export default function SearchBar() {
  const [isSearchResult, setIsSearchResult] = useState(false)
  const [searchResult, setSearchResult] = useState()
  const lastChange = useRef()

  function searchBarFunction(e) { // Adding debouncing and search func.

    if (lastChange.current) { 
      clearTimeout(lastChange.current)
    }

    lastChange.current = setTimeout(async () => {
      lastChange.current = null
      if (e.target.value === '') {
        setSearchResult(undefined)
        return
      }

      const response = await fetch(`http://localhost:8080/projects?project=${e.target.value}`, {
        credentials: 'include'
      })

      const resData = await response.json()
      setSearchResult(resData.projects)
    }, 700)
  }

  return (
    <div>
      <input onClick={() => setIsSearchResult(true)} onMouseLeave={() => setIsSearchResult(false)} ref={lastChange} onChange={(e) => searchBarFunction(e)} id="searchProjectBar"
        className={`px-4 py-1 bg-gray-700 text-white w-96 max-lg:w-72 max-[470px]:w-64 max-[350px]:w-48 ${isSearchResult ? 'rounded-b-none rounded-t-2xl' : 'rounded-2xl'}`}
        placeholder="Search for Projects">

      </input>

      <div onMouseLeave={() => setIsSearchResult(false)} onMouseEnter={() => setIsSearchResult(true)} className={`absolute duration-75 rounded-b-md flex flex-col w-[385px] z-20  max-[470px]:w-[255px] max-[350px]:w-[195px] bg-gray-700 ${isSearchResult && searchResult ? 'opacity-100' : 'opacity-0'}`}>
        {searchResult?.map(result => {
          return (
            <Link className="p-2 duration-75 hover:bg-gray-500" href={`/projects/${result.id}`} key={result.id}>{result.projectName}</Link>
          )
        })}
      </div>
    </div>
  )
}