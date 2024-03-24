import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import "../layout.css";
import { Link,useLocation, useNavigate } from "react-router-dom";
import {  CaretDownFilled} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Badge,  Dropdown, Menu } from "antd";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user}  = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const headerMenu = [
    {
      name: "Home",
      path: "/",
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
  

  const userMenu = [

    {
      name: "Dashboard",
      path: "/",
      icon: "ri-home-line",
      subMenu: [
        { name: " ", path: "/" }, 
      ],
    },
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
      name: "ApplyInvestor",
      path: "/apply-investor",
      icon: "ri-user-fill",
      subMenu: [
        { name: "ApplyInvestor", path: "/applyInvestor" },
        { name: "Contact", path: "/contact" },
      ],
    },
    {
      name: "ApplyFarmleader",
      path: "/apply-farm-leader",
      icon: "ri-folder-user-line",
      subMenu: [
        { name: "ApplyFarmLeader", path: "/applyFarmLeader" },
        { name: "contact", path: "/farmLeadercontact" },
      ],
    },
    {
      name: "ApplyFarmer",
      path: "/applyFarmer",
      icon: "ri-user-line",
      subMenu: [
        { name: "ApplyFarmer", path: "/applyFarmer" },
        { name: "Contact", path: "/contact" },
        {name: "BranchList", path: "/branchList"}
      ],
    },
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: "ri-home-line",
      subMenu: [
        { name: "Home", path: "/home" },
        { name: "Service", path: "/service" },
       
      ],
    },
    {
      name: "Branches",
      path: "/branches",
      icon: "ri-user-fill",
      subMenu: [
        { name: "ListBranch", path: "/branches" },
        { name: "AddBranch", path: "/addBranch" },
        { name: "DeleteBranch", path: "/deletebranch" },
        { name: "UpdateBranch", path: "/updatebranch" },
      ],
    },
    {
      name: "BranchStaff",
      path: "/branchStaff",
      icon: "ri-user-fill",
      subMenu: [
        { name: "ListBranchStaff", path: "/branchStaffList" },
        { name: "AddBranchStaff", path: "/addBranchStaff" },
        { name: "DeleteBranchStaff", path: "/deleteBranchStaff" },
        { name: "UpdateBranchStaff", path: "/updateBranchStaff" },
      ],
    },
    {
      name: "Investors",
      path: "/investorsList",
      icon: "ri-user-fill",
      subMenu: [
        { name: "ListOfInvestors", path: "/investorList" },
        { name: "AddInvestor", path: "/addinvestor" },
        { name: "DeleteInvestor", path: "/deleteInvestor" },
        { name: "UpdateBranch", path: "/updateInvestor" },
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
      name: "Users",
      path: "/users",
      icon: "ri-user-fill",
      subMenu: [
        { name: "ListBranch", path: "/branchlist" },
        { name: "AddBranch", path: "/addbranch" },
        { name: "DeleteBranch", path: "/deletebranch" },
        { name: "UpdateBranch", path: "/updatebranch" },
      ],
    },
    {
      name: "Investors",
      path: "/doctors",
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
      name: "Inputs",
      path: "/CreateInput",
      icon: "ri-user-line",
      subMenu: [
        { name: "InputsList", path: "/inputList" },
        { name: "CreateInput", path: "/createInput" },
        { name: "DeleteInput", path: "/deleteInput" },
        { name: "UpdateInput", path: "/updateInput" },
      ],
    },
    {
      name: "Orders",
      path: "/orders",
      icon: "ri-user-line",
      subMenu: [
        { name: "OrderList", path: "/orders" },
        { name: "CreateOrder", path: "/createOrder" },
        { name: "DeleteOrder", path: "/deleteOrder" },
        { name: "UpdateOrder", path: "/updateOrder" },
      ],
    },
    
  ];
  
  const headerMenuRender = user?.isAdmin || user?.isStockManager ? headerMenu : headerMenu;
  const menuToBeRendered = user?.isAdmin  ? adminMenu : user?.isStockManager ? stockMenu  : userMenu;
   
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
        {!collapsed && <Link to={menu.path}>{menu.name}</Link>} <CaretDownFilled />
      </div>
    );
  };

  const renderDropdownMenu = (subMenu) => {
    return (
      <Menu>
        {subMenu.map((item) => (
          <Menu.Item
            key={item.path}
            onClick={() => handleMenuClick(item.path)}
          className="submenu  .submenu .ant-menu " >
            {item.name}
          </Menu.Item>
        ))}
      </Menu>
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
                <Dropdown
                key={menu.path}
                overlay={renderDropdownMenu(menu.subMenu)}
                placement="right"
                trigger={["hover", "click"]}
                disabled={collapsed}

                >
            {  renderMenuItem(menu)} 
               </Dropdown>
             
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
        <p className=" mx-200">
         © 2024 - Ethio Agricultural inputs distribution and ordering. All Rights Reserved.
       </p>
       </div>
    </div>
    
  );
};

export default Layout;