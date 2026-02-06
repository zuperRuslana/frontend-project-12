import React from "react";
import Navbar from 'react-bootstrap/Navbar';  
import Container from 'react-bootstrap/Container';
import Button from "react-bootstrap/Button";
export const Header = () => {
return (
    <Navbar className="shadow-sm navbar-dark bg-slate">
         <Container>
            <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
            <Button className="btn-light text-slate">Выйти</Button>
        </Container>
</Navbar>
)
}