import './globals.css';
import '../components/layout/navbar.css';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li className="dropdown">
          <a href="#" className="dropbtn">Services</a>
          <div className="dropdown-content">
            <a href="#">Service 1</a>
            <a href="#">Service 2</a>
            <a href="#">Service 3</a>
          </div>
        </li>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;


/*  navbar.css */
nav {
  background-color: #333;
  overflow: hidden;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

nav li {
  float: left;
}

nav li a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

nav li a:hover {
  background-color: #111;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

/* globals.css (Example - Add more robust styles as needed) */
body {
  font-family: sans-serif;
  margin: 0;
}