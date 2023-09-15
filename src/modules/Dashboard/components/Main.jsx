import { Route, Routes } from "react-router-dom"
import { Home } from "../../notes/components/Home"
import { Add } from "../../notes/components/Add"
import { List } from "../../notes/components/List"
import { Delete } from "../../notes/components/Delete"

export const Main = () =>{
    return (<>
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/Delete" element={<Delete/>}/>
            <Route path="/list" element={<List/>}/>
        </Routes>
    </>)
}