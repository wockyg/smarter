import React, { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AddFormContext } from '../contexts/AddFormContext';
import { SearchContext } from '../contexts/SearchContext';

import { useNavigate } from "react-router-dom";

export default function SmarterNavbar() {

  const { setAddModalOpen, setModalParty } = useContext(AddFormContext);
  const { setQuickSearchVal, setQuickSearchInputVal } = useContext(SearchContext);

  const navigate = useNavigate();

  const handleOpen = (party) => {
    setModalParty(party);
    setAddModalOpen(true);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#">SMARTER</Navbar.Brand>
        <Navbar.Toggle aria-controls="smarter-navbar-nav" />
        <Navbar.Collapse id="smarter-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <NavDropdown title="Add" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => handleOpen('adjuster')}>Add adjuster</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('casemanager')}>Add case manager</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('client')}>Add client</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('claimant')}>Add claimant</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('employer')}>Add employer</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('physician')}>Add physician</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('therapist')}>Add therapist</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('attorney')}>Add attorney</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => handleOpen('referral')}>Add referral</NavDropdown.Item>
              <NavDropdown.Item onClick={() => handleOpen('agreement')}>New Agreement</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={() => {navigate('/'); setQuickSearchVal(null); setQuickSearchInputVal('');}}>Reset</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}