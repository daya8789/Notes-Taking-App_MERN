import {NavLink} from 'react-router-dom';

export const NavBar = () =>{
    return (<>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Add">Add Notes</NavLink> 
        <NavLink to="/Delete">Delete</NavLink>
        <NavLink to="/List">View All</NavLink>
    </>)
}