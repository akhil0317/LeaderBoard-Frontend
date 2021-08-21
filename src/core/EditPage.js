import React, {useState,useEffect} from "react";
import {BrowserRouter,Switch,Route, Link,Redirect} from "react-router-dom"

export default function Edit(props){
    const [userData,setUserData] = useState({
        "rank":"",
        "name":"",
        "platform":"",
        "year":"",
        "genre":"",
        "publisher":"",
        "globalSales":"",
        "didRedirect":false
    });

    useEffect(()=>{
        setUserData({...props.location.userData,didRedirect:false})
    },[])

    const handleChange = (name)=> (event)=>{
        setUserData({...userData,[name]:event.target.value})
    }

    
const performRedirect =() =>{
    if(userData.didRedirect)
    return <Redirect to = "/"/>
}


    const onSubmit = (event) =>{
        event.preventDefault();
            fetch("https://infinite-castle-76223.herokuapp.com/api/editData",{
                method:"POST",
                headers:{
                    Accept:"application/json",
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify(userData),
            })
            .then(response=>{
              setUserData({...userData,didRedirect:true})

            })
            .catch(err=>{
                console.log(err);
            })
    }

    return(
        
        <div className = "row">
                    <div className="col-md-6 offset-sm-3 text-left">
                        <form>
                           

                            <div className="form-group">
                            <lable className="text-dark">Rank</lable>
                            <input className = "form-control" type="text" value ={userData.rank} onChange={handleChange("rank")}/>
                            </div>

                            <div className="form-group">
                            <lable className="text-dark">Name</lable>
                            <input   className = "form-control" type="text" value = {userData.name} onChange = {handleChange("name")}/>
                            </div>

                            <div className="form-group">
                            <lable className="text-dark">Platform</lable>
                            <input   className = "form-control" type="text" value={userData.platform} onChange = {handleChange("platform")}/>
                            </div>

                            <div className="form-group">
                            <lable className="text-dark">Year</lable>
                            <input   className = "form-control" type="text" value = {userData.year} onChange = {handleChange("year")}/>
                            </div>

                            <div className="form-group">
                            <lable className="text-dark">Genre</lable>
                            <input   className = "form-control" type="text" value ={userData.genre} onChange = {handleChange("genre")}/>
                            </div>

                            <div className="form-group">
                            <lable className="text-dark">Publisher</lable>
                            <input   className = "form-control" type="text" value={userData.publisher} onChange = {handleChange("publisher")}/>
                            </div>

                            <div className="form-group">
                            <lable className="text-dark">GlobalSales</lable>
                            <input   className = "form-control" type="text" value={userData.globalSales} onChange = {handleChange("globalSales")}/>
                            </div>

                            <button onClick={onSubmit} className="btn btn-success btn-block">Submit</button>
                        </form>
                     

                    </div>
                    {performRedirect()}
            </div>
         
    )
}