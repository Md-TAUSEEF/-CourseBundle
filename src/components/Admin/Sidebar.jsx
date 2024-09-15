import React from 'react';
import { RiAddCircleFill, RiDashboardFill, RiEyeFill, RiUser3Fill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';
export default function Sidebar() {
  const location = useLocation();
  return (
    <div className='Sidebar_cnt'>
      <div className='sidebar_mid1'>
        <LinkButton Icon={RiDashboardFill} text="Dashboard" url="dashboard" active={location.pathname === '/admin/dashboard'} />
        <LinkButton Icon={RiAddCircleFill} text="Create Course" url="createcourse" active={location.pathname === '/admin/createcourse'} />
        <LinkButton Icon={RiEyeFill} text="Course" url="course" active={location.pathname === '/admin/course'} />
        <LinkButton Icon={RiUser3Fill} text="User" url="user" active={location.pathname === '/admin/user'} />
      </div>
    </div>
  );
}

function LinkButton({ url, Icon, text, active }) {
  return (
    <div className='sidebar_mid'>
      <Link to={`/admin/${url}`}>
        <button style={{ color: active ? "black" : "inherit" }}>
          <Icon />
          {text}
        </button>
      </Link>
    </div>
  );
}
