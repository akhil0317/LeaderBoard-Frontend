import React, {useState,useEffect} from "react";
import { Link} from 'react-router-dom';

export default function Home(){
  const [userData,setUserData] = useState({
    data: [],
    search:"",
    filteredData:[]
  });
  const [currentPage,setCurrentPage] = useState(1);
  const [limit,setLimit] = useState(9);
  const[isPrevious,setIsPrevious] = useState(false);
  const[isnext,setIsNext] = useState(true);
  const[isSort,setIsSort]  = useState(false);

const sort = (e)=>{
let arr = [...userData.data]
let value = e.target.value
if(value=="rank" || value=="year"||value=="globalSales")
{
   
    arr.sort((a,b)=>{
      return a[value]-b[value]
    })
  
}
else
{
  arr.sort((a,b)=>{
    if(a[value]<b[value])
    return -1;
    else if(a[value]>b[value])
    return 1;
    else
    return 0
  })
}
setUserData({...userData,data:arr,filteredData:arr})
setIsSort(!isSort)
}

const previousPageHandler = ()=>{
    let page = currentPage-1;
    if(page==1)
    {
      setIsPrevious(false);
    }

    setIsNext(true);
    

      setCurrentPage(page)
  }

  const nextPageHandler = ()=>{
    let page = currentPage+1;
    if(page>1)
    setIsPrevious(true);
    if(page==56)
    setIsNext(false)
    setCurrentPage(page)
  }

  const pagination = () =>{
      let startIndex = (currentPage * limit) -  limit
      let endIndex = startIndex + limit;
      
      setUserData({...userData,filteredData:userData.data.slice(startIndex,endIndex)})
  }

  useEffect(()=>{
    pagination()
},[currentPage,isSort])

  const loadUserData = ()=>{
   
    fetch(`https://infinite-castle-76223.herokuapp.com/api/getRank`,{
      method:"GET"
    })
    .then(response=>{
      return response.json();
    })
    .then((data)=>{
        setUserData({...userData,data:data.data,filteredData:data.data.slice(0,9)})
        
   })
    .catch(err=>console.log(err));
  }

  const searchFilter = (event) =>{
    setUserData({...userData,search:document.getElementById("searchTag").value})
  }

  useEffect(()=>{
    loadUserData()
},[])

useEffect(()=>{
  let startIndex = (currentPage * limit) -  limit
  let endIndex = startIndex + limit;
    if(userData.search=="")
    setUserData({...userData,filteredData:userData.data.slice(startIndex,endIndex)})
    else{
      const temp = userData.data.filter((data)=>{
        if(data.name.toLowerCase().replace(/\s/g, '').includes(userData.search.toLowerCase().replace(/\s/g, ''))==true)
        return userData
      })
       setUserData({...userData,filteredData:temp})
    }

},[userData.search])

    return (
      <div>
        <h3 style={{backgroundColor: "#58a894"},{textAlign:"center"}}>Hi There check the LeaderBoard Below!!</h3>
<div class="col-md-12 ">
            <button type="button" class="btn btn-outline-danger" onClick={(e)=>sort(e)} value ="name">SortByName</button>
             <button type="button" class="btn btn-outline-danger" onClick={(e)=>sort(e)} value = "rank">SortByRank</button>
             <button type="button" class="btn btn-outline-danger" onClick={(e)=>sort(e)} value = "platform">SortByPlatform</button>
             <button type="button" class="btn btn-outline-danger" onClick={(e)=>sort(e)} value = "year">SortByyear</button>
             <button type="button" class="btn btn-outline-danger" onClick={(e)=>sort(e)} value ="genre">SortByGenre</button>
             <button type="button" class="btn btn-outline-danger" onClick={(e)=>sort(e)} value = "publisher">SortByPublisher</button>
             <button type="button" class="btn btn-outline-danger" onClick={(e)=>sort(e)} value = "globalSales">SortByGlobalSales</button>
             <hr/>
</div>
<div class="input-group">
  <input type="search" className="form-control rounded,border border-primary" id="searchTag" placeholder="Search" aria-label="Search"
    aria-describedby="search-addon"  onChange= {(event)=>searchFilter(event)} value = {userData.search}/>
  <button type="button" className="btn btn-outline-primary" onClick={searchFilter}>search</button>
</div>

  <table className="table">
  <thead>
    <tr>
      <th scope="col">Rank</th>
      <th scope="col">Name</th>
      <th scope="col">Platform</th>
      <th scope="col">Year</th>
      <th scope="col">Genre</th>
      <th scope="col">Publisher</th>
      <th scope="col">Global_sales</th>
      <th>Edit</th>
    </tr>
  </thead>
  <tbody>
  {userData.filteredData.map((data,index)=>{
                  return (
                               <tr>
                                <th scope="row">{data.rank}</th>
                                <td>{data.name}</td>
                                <td>{data.platform}</td>
                                <td>{data.year}</td>
                                <td>{data.genre}</td>
                                <td>{data.publisher}</td>
                                <td>{data.globalSales}</td>
                                <td><Link to ={{pathname:"/edit",userData:data}}>Edit</Link></td>
                              </tr>                             
                  )
              })}
   
   
  </tbody>
</table>
<div class="col-md-12 text-center">
            {isPrevious && <button type="button" class="btn btn-outline-primary" onClick={previousPageHandler}>Previous</button>}
            {isnext && <button type="button" class="btn btn-outline-primary" onClick={nextPageHandler}>Next</button>}
        </div>
      </div>
      
    )

}