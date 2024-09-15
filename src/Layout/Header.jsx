import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiDashboardFill, RiMenuFill, RiLogoutBoxLine } from 'react-icons/ri';
import './Header.css';
import { useDispatch } from 'react-redux';
import { logout } from '../Redux/actions/user';

export default function Header({ isAuthenticated = false, user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const dispatch = useDispatch();

  const logouthandler = () => {
    dispatch(logout());
  };
  
  


  return (
    <>
      <button className='Header_btn' onClick={toggleMenu}>
        <RiMenuFill />
      </button>

      {isMenuOpen && (
        <div className='left-menu'>
          <div className='left-menu-header'>
            <h3>Course Bundler</h3>
            <hr />
          </div>
          <div className='left-menu-links'>
            <Link to='/' onClick={toggleMenu}>
              <button className='left-menu-btn'>Home</button>
            </Link>
            <Link to='/courses' onClick={toggleMenu}>
              <button className='left-menu-btn'>Browse All Courses</button>
            </Link>
            <Link to='/requestcourse' onClick={toggleMenu}>
              <button className='left-menu-btn'>Request All Courses</button>
            </Link>
            <Link to='/contact' onClick={toggleMenu}>
              <button className='left-menu-btn'>Contact Us</button>
            </Link>
            <Link to='/about' onClick={toggleMenu}>
              <button className='left-menu-btn'>About</button>
            </Link>
          </div>
          <div className='left-menu-footer'>
            {isAuthenticated ? (
              <div className='left-menu-user'>
                <Link to='/profile' onClick={toggleMenu}>
                  <button className='left-menu-btn'>Profile</button>
                </Link>
                <button className='left-menu-btn' onClick={logouthandler}>
                  <RiLogoutBoxLine /> Logout
                </button>
                {user && user.role === 'admin' && (
                  <Link to='/admin/dashboard' onClick={toggleMenu}>
                    <button className='left-menu-btn'>
                      <RiDashboardFill style={{ fontSize: 16 }} />
                      Dashboard
                    </button>
                  </Link>
                )}
              </div>
            ) : (
              <div className='left-menu-auth'>
                <Link to='/login' onClick={toggleMenu}>
                  <button className='left-menu-btn'>Login</button>
                </Link>
                <p>OR</p>
                <Link to='/signup' onClick={toggleMenu}>
                  <button className='left-menu-btn'>Sign Up</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
