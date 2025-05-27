// import React from 'react'
// // import "bootstrap/dist/css/bootstrap.min.css";
// // import "./App.css";

// const Extra = () => {
//   return (
//     <div className="app-container">
//     {/* Navbar */}


//     {/* Hero Section */}
//     <header className="hero-section" style={{
//       backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926')",
//       backgroundSize: "cover",
//       backgroundPosition: "center",
//       backgroundRepeat: "no-repeat",
//       height: "100vh",
//       position: "relative",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       textAlign: "center",
//       color: "white"
//     }}>
//       <div className="overlay" style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         width: "100%",
//         height: "100%",
//         background: "rgba(0, 0, 0, 0.6)"
//       }}></div>
//       <div className="container hero-content" style={{ position: "relative", zIndex: 1 }}>
//         <h5>HEALTH EQUITY</h5>
//         <h1>How can we expand access to healthcare?</h1>
//         <p>Healthcare tech + lasting partnerships + insightful data</p>
//       </div>
//     </header>
//   </div>
//   )
// }

// export default Extra



//card product--------------------------------------------------
// import React from 'react';

// const Extra = () => {
//   return (
//     <div className="flex flex-wrap justify-center gap-6 items-center min-h-screen font-sans bg-gray-100 p-4">
//       {[1, 2, 3,4,5].map((item) => (
//         <div key={item} className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
//           <img
//             className="w-full h-44 object-cover"
//             src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2hvZXVzJTIwbmlrZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60"
//             alt="Nike Sneaker"
//           />
//           <div className="p-4">
//             <div className="flex justify-between items-center mb-2">
//               <div>
//                 <h4 className="text-lg font-semibold">Nike Sneaker</h4>
//                 <h3 className="text-xl font-bold text-gray-900">$120</h3>
//               </div>
//               <div>
//                 <a href="#" className="px-4 py-1 border border-blue-500 text-blue-500 rounded-md text-md">
//                   View Details
//                 </a>
//               </div>
//             </div>
//             <hr className="mb-3" />
//             <p className="text-md text-gray-600 mb-4">
//               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, dignissimos.
//             </p>
//             <div className="flex space-x-3">
//               <a href="#" className="px-4 py-2 bg-green-500 text-white rounded-md text-md">
//                 Buy Now
//               </a>
//               <a href="#" className="text-gray-800 text-md">
//                 Cancel
//               </a>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Extra;


import React from 'react';

const Extra = () => {
  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-dark sticky-top flex-md-nowrap p-0 bg-dark">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company Name</a>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search" />
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap">
            <a className="nav-link text-white" href="#">Sign out</a>
          </li>
        </ul>
      </nav>

      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky p-3">
              <ul className="nav flex-column">
                <li className="nav-item">
                  <a className="nav-link active" href="#">
                    <i className="zmdi zmdi-widgets"></i> Dashboard <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="zmdi zmdi-file-text"></i> Orders
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="zmdi zmdi-shopping-cart"></i> Products
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="zmdi zmdi-accounts"></i> Customers
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="zmdi zmdi-chart"></i> Reports
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    <i className="zmdi zmdi-layers"></i> Integrations
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          {/* Main Content */}
          <main className="col-md-10 ml-sm-auto px-4">
            <h2 className="mt-4">Dashboard</h2>
            <p>Welcome to the admin dashboard.</p>
          </main>
        </div>
      </div>
    </>
  );
};

export default Extra;



{/* <div class="app-header__content">
<div class="app-header-left">
    <div class="search-wrapper">
        <div class="input-holder">
            <input type="text" class="search-input" placeholder="Type to search">
            <button class="search-icon"><span></span></button>
        </div>
        <button class="close"></button>
    </div>
    <ul class="header-menu nav">
        <li class="nav-item">
            <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon fa fa-database"> </i>
                Statistics
            </a>
        </li>
        <li class="btn-group nav-item">
            <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon fa fa-edit"></i>
                Projects
            </a>
        </li>
        <li class="dropdown nav-item">
            <a href="javascript:void(0);" class="nav-link">
                <i class="nav-link-icon fa fa-cog"></i>
                Settings
            </a>
        </li>
    </ul>        </div>
<div class="app-header-right">
    <div class="header-btn-lg pr-0">
        <div class="widget-content p-0">
            <div class="widget-content-wrapper">
                <div class="widget-content-left">
                    <div class="btn-group">
                        <a data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" class="p-0 btn">
                            <img width="42" class="rounded-circle" src="assets/images/avatars/1.jpg" alt="">
                            <i class="fa fa-angle-down ml-2 opacity-8"></i>
                        </a>
                        <div tabindex="-1" role="menu" aria-hidden="true" class="dropdown-menu dropdown-menu-right">
                            <button type="button" tabindex="0" class="dropdown-item">User Account</button>
                            <button type="button" tabindex="0" class="dropdown-item">Settings</button>
                            <h6 tabindex="-1" class="dropdown-header">Header</h6>
                            <button type="button" tabindex="0" class="dropdown-item">Actions</button>
                            <div tabindex="-1" class="dropdown-divider"></div>
                            <button type="button" tabindex="0" class="dropdown-item">Dividers</button>
                        </div>
                    </div>
                </div>
                <div class="widget-content-left  ml-3 header-user-info">
                    <div class="widget-heading">
                        Alina Mclourd
                    </div>
                    <div class="widget-subheading">
                        VP People Manager
                    </div>
                </div>
                <div class="widget-content-right header-user-info ml-3">
                    <button type="button" class="btn-shadow p-1 btn btn-primary btn-sm show-toastr-example">
                        <i class="fa text-white fa-calendar pr-1 pl-1"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>        </div>
</div>
</div>   */}