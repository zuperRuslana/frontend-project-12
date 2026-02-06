import React from "react";
import Navbar from 'react-bootstrap/Navbar';  
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
import {logOut} from '../slices/authentificationSlice'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate(); 

    const handleLogOut =()=> {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        dispatch(logOut())
        navigate('/login')

    }
return (
    <Navbar className="shadow-sm navbar-dark bg-slate">
         <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            <Button onClick={handleLogOut} className="btn-light text-slate">Выйти</Button>
        </Container>
</Navbar>
)
}