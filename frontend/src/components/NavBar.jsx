import { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavBar = () => {

  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [])

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  }

  return (
      <Navbar expand="md" className={scrolled ? "scrolled" : ""}>
        <Container>
          <Navbar.Brand href="/">
            ResumeRAG
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggler-icon"></span>
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
              <Nav.Link as={Link} to="/upload" className={activeLink === 'upload' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('upload')}>Upload</Nav.Link>
              <Nav.Link as={Link} to="/search" className={activeLink === 'search' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('search')}>Search</Nav.Link>
              <Nav.Link as={Link} to="/jobs" className={activeLink === 'jobs' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('jobs')}>Jobs</Nav.Link>
            </Nav>
            <span className="navbar-text">
              <button className="vvd" onClick={() => window.open('https://github.com/AyushKUMAR031', '_blank')}><span>Let’s Connect</span></button>
            </span>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}