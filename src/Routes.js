import Home from "./core/Home"
import EditPage from "./core/EditPage"
import {BrowserRouter,Switch,Route} from "react-router-dom"
export default function Routes(){
    return(
      <BrowserRouter>
      <Switch>
        <Route path = "/" exact component = {Home}/> 
        <Route path="/edit" component = {EditPage}/>
    </Switch>
      </BrowserRouter>
    )
  }