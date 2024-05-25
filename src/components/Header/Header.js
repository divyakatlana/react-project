import React from 'react';
import './Header.scss';
import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
const Header = () => {
    const [leftSidebar, setLeftSidebar] = useState(false);
  const toggleSidebar = () => {
    setLeftSidebar(!leftSidebar); 
};
        return (
          <div>
            <nav className='navbar navbar-expand-lg navbar-light'>
                <a className="navbar-brand" href="/">Starwars Movies</a>
                <ul className="navbar-nav ml-auto listMenu">
                    <li className="nav-item active">
                        <a className="nav-link show-home-menu" href="/">Home
                            <span className="sr-only">(current)</span>
                        </a>
                    </li>
                </ul>
                <div className="sidebar-nav-btn">
                                <img src='./assets/images/menu.svg' alt="show Icon" onClick={toggleSidebar}/>
                </div>
            </nav>
            <Sidebar visible={leftSidebar} position="left" onHide={() => setLeftSidebar(false)} baseZIndex={10000}>
                    <div className="sidebarNav">
                        <div className="menu-container">
                            <div className="sidebarMenu">
                                <img src='/assets/images/home.svg' alt="Home Icon" />
                                <a className="sidebar-nav-link" href="/">
                                    Home
                                    <span className="sr-only">(current)</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Sidebar>
                </div>
               );
            }
export default Header;