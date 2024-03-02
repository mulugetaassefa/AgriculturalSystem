import React, { useState } from "react";
import "../layout.css";
import { Link,useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge } from "antd";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user}  = useSelector((state) => state.user);
  
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "ApplyInvestor",
      path: "/apply-investor",
      icon: "ri-user-fill",
    },
    {
      name: "ApplyFarm leader",
      path: "/apply-farm-leader",
      icon: "ri-folder-user-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-user-fill",
    },
    {
      name: "Investors",
      path: "/doctors",
      icon: "ri-user-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
  ];

  const stockMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/users",
      icon: "ri-user-fill",
    },
    {
      name: "Investors",
      path: "/doctors",
      icon: "ri-user-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "FarmUnion",
      path: "/farm-union",
      icon: "ri-user-line",
    },
    {
      name: "Inputs",
      path: "/inputs",
      icon: "ri-user-line",
    },
    {
      name: "Orders",
      path: "/orders",
      icon: "ri-user-line",
    },
    {
      name: "Notification",
      path: "/notification",
      icon: "ri-user-line",
    },
  ];

  
  const menuToBeRendered = user?.isAdmin  ? adminMenu : user?.isStockManager ? stockMenu  : userMenu;

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            <h1 className="logo">EFS</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={menu.path}
                  className={`d-flex menu-item ${isActive && "active-menu-item"}`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => {
                localStorage.clear();
                window.location.reload();
                navigate("/login");
                
              }}
            >
              <i className="ri-logout-circle-r-line"></i>
              {!collapsed && (
                <Link to="/login">Logout</Link>
              )}
            </div>
          </div>
        </div>

        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex align-items-center px-4">
               <Badge count={user?.unseenNotification.length} onClick={() => navigate('/notification')}>
               <i className="ri-notification-line header-action-icon px-3"></i>       
             </Badge>
             
              <Link className="anchor mx-3" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>

          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;