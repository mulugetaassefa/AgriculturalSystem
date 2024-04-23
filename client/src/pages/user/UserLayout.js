import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import '../../.././src'
import { Link,useLocation, useNavigate } from "react-router-dom";
import {  CaretDownFilled} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Badge,  Dropdown, Menu } from "antd";

const UserLayout = ({ children }) => {
  const location = useLocation();
  const { user}  = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const headerMenu = [

    {
      name: "Home",
      path: "/home",
      icon: "ri-home-line",
    },
    {
      name: "Service",
      path: "/service",
      icon: "ri-service-line",
    },
    {
      name: "About",
      path: "/about",
      icon: "ri-community-fill",
    },
    {
      name: "Contact",
      path: "/contact",
      icon: "ri-contacts-book-3-line",
    },
  ];
  const branchMenu = [
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
      subMenu: [
        { name: "ListOfAppointment", path: '/appointment' },
        { name: "AddAppointment", path: "/addAppointment" },
      ],
    },
  ]
  const userMenu = [
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
      subMenu: [
        { name: "ListOfAppointment", path: '/appointment' },
        { name: "AddAppointment", path: "/addAppointment" },
      ],
    },
    {
      name: "Order",
      path: "/farmer/order",
      icon: "ri-file-list-line",
      subMenu: [
        { name: "ListOfAppointment", path: '/appointment' },
        { name: "AddAppointment", path: "/addAppointment" },
      ],
    },
    {
      name: "Cart",
      path: "/farmer/cart",
      icon: "ri-file-list-line",
      subMenu: [
      ],
    },
    {
      name: "Contact",
      path: "/farmer/contact",
      icon: "ri-file-list-line",
      subMenu: [
      ],
    },
  ];
  
 
  const stockMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ri-home-line",
      subMenu: [
        { name: "Home", path: "/dashboard" },
        { name: "Service", path: "/service" },
        
      ],
    },
    {
      name: "Distribut Input",
      path: "/distribut-input",
      icon: "ri-user-fill",
      subMenu: [
        { name: "ListBranch", path: "/branchlist" },
        { name: "Distribute Input", path: "/distribut-input"},
      
      ],
    },
    {
      name: "Investors",
      path: "/investors",
      icon: "ri-user-fill",
      subMenu: [
        { name: "ListBranch", path: "/branchlist" },
        { name: "AddBranch", path: "/addbranch" },
        { name: "DeleteBranch", path: "/deletebranch" },
        { name: "UpdateBranch", path: "/updatebranch" },
      ],
    },
    {
      name: "FarmUnion",
      path: "/farm-union",
      icon: "ri-user-line",
      subMenu: [
        { name: "farmUnionList", path: "/unionlist" },
        { name: "AddFarmUnion",  path: "/addUnion" },
        { name: "DeleteFarmUnion", path: "/deleteUnion" },
        { name: "UpdateFarmUnion", path: "/updateUnion" },
      ],
    },
    {
      name: "Category",
      path: "/category",
      icon: "ri-user-line",
      subMenu: [
       
        
      ],
    },
    {
      name: "Inputs",
      path: "/CreateInput",
      icon: "ri-user-line",
      subMenu: [
        
      ],
    },
    {
      name: "Orders",
      path: "/orders",
      icon: "ri-user-line",
      subMenu: [
       
      ],
    },
    {
      name: " Track Order",
      path: "/trackOrder",
      icon: "ri-user-line",
      subMenu: [
       
      ],
    },
    
  ];
  
  const headerMenuRender = headerMenu;
  const menuToBeRendered = user?.isStockManager ? stockMenu  : userMenu;
   
  const handleMenuClick = (path) => {
        // Redirect to the path of the submenu item
     
      window.location.href = path;
  };
    // render header menu
  const renderHeaderMenu = (menu) => {
    const isActive = location.pathname === menu.path;
    return (
      <div key={menu.path} className={`d-flex menu-item ${isActive && "active-menu-item"}`}>
        <i className={menu.icon}></i>
        <Link to={menu.path}>{menu.name}</Link>
      </div>
    );
  };
  

  const renderMenuItem = (menu) => {
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
  };

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            <h1 className="logo">EFS</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => ( 
                <div className={`d-flex`} key={menu.path}>
                {renderMenuItem(menu)}
              </div>
            ))}

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
             <i className="ri-menu-line header-action-icon" onClick={() => setCollapsed(false)}></i>
             ) : (
            <i className="ri-close-line header-action-icon" onClick={() => setCollapsed(true)}></i>
              )}

             {/* Header menu */}
           <div className="d-flex align-items-center mx-2 my-1 header-anchor ">{headerMenuRender.map(renderHeaderMenu)}</div>

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
      <div className="d-flex align-items-center copy-right">
       </div>
       <div style={{textAlign: 'center'}}>
       <p >
         © 2024 - Ethio Agricultural inputs distribution and ordering. All Rights Reserved.
       </p>
       </div>
    </div>
    
  );
};

export default UserLayout;
