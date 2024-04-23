import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css"; // Import Bootstrap CSS
import "../layout.css";
import { Link,useLocation, useNavigate } from "react-router-dom";
import {  CaretDownFilled} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { Badge,  Dropdown, Menu} from "antd";
import { FaHome, FaUser, FaSearch } from 'react-icons/fa';
import BranchStaffLoginPage from "../pages/BranchStaffLogin";
import { AppstoreOutlined } from "@ant-design/icons";
import axios from 'axios';


const Layout = ({ children }) => {
  const location = useLocation();
  const { user}  = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [branchName, setBranchName] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchSttafId, setBranchSttafId] =  useState("");
  const [branches, setBranches] = useState([]);

  const brachStaffMenu = [
    { 
   name:"Dashboard",
   path: "/branch/dashboard",
   icon: "ri-file-list-line",
    subMenu: [
    ],
  },
   { 
    name:"Farmer",
    path: "/branch/farmer",
    icon: "ri-file-list-line",
     subMenu: [
       
     ],
   },
   { 
    name:"Order",
    path: "/branch/order",
    icon: "ri-file-list-line",
     subMenu: [
       
     ],
   },
   { 
    name:"Cart",
    path: "/branch/cart",
    icon: "ri-file-list-line",
     subMenu: [
      
     ],
   },
   { 
    name:"inputs",
    path: "/branch/input",
    icon: "ri-file-list-line",
     subMenu: [
       
     ],
   },
  ];
  
 const investorMenu =  [ 
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
        {name: "BranchList", path: "/branches"}
      ],
    },
    
  ];

  const adminMenu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaHome />,
      subMenu: [
      ],
    },
    {
      name: "Branches",
      path: "/branches",
      icon: "ri-user-fill",
      subMenu: [
      ],
    },
    {
      name: "BranchStaff",
      path: "/branch/dashboard",
      icon: "ri-user-fill",
      subMenu: [
      
      ],
    },
    {
      name: "Investors",
      path: "/investorsList",
      icon: "ri-user-fill",
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
      path: "/investorsList",
      icon: "ri-user-fill",
      subMenu: [
        
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
  
  const handleBranchStaffLogin = (name, branchId,branchSttafId) => {
    setBranchName(name);
    setBranchId(branchId);
    setBranchSttafId(branchSttafId);
  };

 // Fetch branches data from the server
  useEffect(() => {
   
    axios
      .get('http://localhost:3000/api/user/admin/branchId/${branchId}')
      .then(response => {
        setBranches(response.data);
      })
      .catch(error => {
        console.error('Error fetching branches:', error);
      },[]);
    });
 const branch = branches.find( b => b.name.toLowerCase() === branchName.toLowerCase() && b.branchId === branchId && b.branchStaff.toLowerCase() === branchSttafId.toLowerCase());
  if (user?.isBranchStaff && !branch) {
    return <BranchStaffLoginPage handleBranchStaffLogin={handleBranchStaffLogin} />;
  }
  
  
  const headerMenuRender = user?.isAdmin || user?.isStockManager ? headerMenu : headerMenu;

  const menuToBeRendered = user?.isAdmin  ? adminMenu : user?.isStockManager ? stockMenu  :
   user?.isInvestor ? investorMenu  : user?.isBranchStaff ? brachStaffMenu :userMenu;

   
   
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
        {!collapsed && <Link to={menu.path}>{menu.name}</Link>}  {/* dropdowon  <CaretDownFilled />  */} 
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
                placement="bottom"
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
       </div>
       <div style={{textAlign: 'center'}}>
       <p >
         © 2024 - Ethio Agricultural inputs distribution and ordering. All Rights Reserved.
       </p>
       </div>
    </div>
    
  );
}

export default Layout;