import React from "react";
import Navbar from 'react-bootstrap/Navbar';  
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import {logOut} from '../slices/authentificationSlice'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate(); 
    const loggedUser = useSelector((state) => state.auth.user)
console.log(loggedUser)
    const handleLogOut =()=> {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        dispatch(logOut())
        console.log('после logOut, user в сторе:', loggedUser) // что здесь?

        navigate('/login')

    }
return (
    <Navbar className="shadow-sm navbar-dark bg-slate">
         <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            {loggedUser && <Button onClick={handleLogOut} className="btn-light text-slate">Выйти</Button>}
        </Container>
</Navbar>
)
}