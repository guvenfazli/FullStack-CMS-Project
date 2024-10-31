import { useState, useRef } from "react"



export default function SearchBar() {

  const [searchResult, setSearchResult] = useState()
  const lastChange = useRef()

  function searchBarFunction(e) {

    if (lastChange.current) {
      clearTimeout(lastChange.current)
    }

    lastChange.current = setTimeout(async () => {
      lastChange.current = null
      const response = await fetch(`http://localhost:8080/projects?project=${e.target.value}`, {
        method: 'GET',
        credentials: 'include'
      })
      const resData = await response.json()
      setSearchResult(resData.projects)
    }, 700)

  }

  console.log(searchResult)





  return (
    <div className="border">
      <input ref={lastChange} onChange={(e) => searchBarFunction(e)} id="searchProjectBar" className="px-4 py-1 bg-gray-700 text-white w-96 rounded-2xl  max-[470px]:w-64 max-[350px]:w-48" placeholder="Search for Projects"></input>

      <div className="absolute w-[385px] p-3 z-20 border max-[470px]:w-[255px] max-[350px]:w-[195px] bg-slate-700">
        {searchResult?.map(result => {
          return (
            <p key={result.id}>{result.projectName}</p>
          )
        })}
      </div>
    </div>
  )
}