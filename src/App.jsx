// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./contexts/AuthContext"; // AuthContext to provide authentication state
// import { TotalCostProvider } from "./contexts/TotalCostContext"; // TotalCostProvider for the calculator routes

// // Import pages
// import Login from "./pages/Home/Login";
// import Signup from "./pages/Home/Signup";
// import AdminLogin from "./pages/Home/AdminLogin";
// import AdminPanel from "./pages/Admin/AdminPanel";
// import AdminDashboard from "./pages/Admin/AdminDashboard";
// import HomePage from "./pages/Home/HomePage";
// import ViewFiles from "./pages/upload/ViewFiles";
// import Upload from "./pages/upload/Upload";
// import InquiryForm from "./pages/Inquiry/InquiryForm";
// import InquiriesPage from "./pages/Inquiry/InquiriesPage";
// import AddDirectory from "./pages/Directory/AddDirectory";
// import ViewDirectory from "./pages/Directory/ViewDirectory";
// import UpcomingEvents from "./pages/Event/UpcomingEvents";
// import EventDetails from "./pages/Event/EventDetails";
// import HeaderInquiry from "./pages/Inquiry/HeaderInquiry";
// import HeaderDirectory from "./pages/Directory/HeaderDirectory";
// import WelcomePage from "./pages/Calculator/WelcomePage";
// import LabourAndSupervisorCharges from "./pages/Calculator/LabourAndSupervisorCharges";
// import LightingAndElectrician from "./pages/Calculator/LightingAndElectrician";
// import Flooring from "./pages/Calculator/Flooring";
// import Furniture from "./pages/Calculator/Furniture";
// import Transportation from "./pages/Calculator/Transportation";
// import MaterialCost from "./pages/Calculator/MaterialCost";
// import FinalCost from "./pages/Calculator/FinalCost";
// import CalculatorPanel from "./pages/Calculator/CalculatorPanel";

// // Import the PrivateRoute component for protecting routes
// import PrivateRoute from "./components/PrivateRoute ";
// import PrivateRoute2 from "./components/PrivateRoute2";

// import SidebarEvent from "./pages/Event/SidebarEvent";
// import Landing from "./pages/Home/Landing";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           {/* Public Routes (No Authentication Required) */}
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/adminlogin" element={<AdminLogin />} />
//           <Route path="/land" element={<Landing />} />

//           {/* Protected Routes (Requires Authentication) */}
//           <Route path="/home" element={<PrivateRoute element={HomePage} />} />
//           <Route path="/view" element={<PrivateRoute element={ViewFiles} />} />
//           <Route path="/upload" element={<PrivateRoute2 element={Upload} />} />
//           <Route
//             path="/admin"
//             element={<PrivateRoute2 element={AdminPanel} />}
//           />
//           <Route
//             path="/dashboard"
//             element={<PrivateRoute2 element={AdminDashboard} />}
//           />
//           <Route
//             path="/form"
//             element={<PrivateRoute element={InquiryForm} />}
//           />
//           <Route
//             path="/inquiries"
//             element={<PrivateRoute2 element={InquiriesPage} />}
//           />
//           <Route
//             path="/add-directory"
//             element={<PrivateRoute2 element={AddDirectory} />}
//           />
//           <Route
//             path="/view-directory"
//             element={<PrivateRoute2 element={viewDirectory} />}
//           />
//           <Route
//             path="/events"
//             element={<PrivateRoute2 element={UpcomingEvents} />}
//           />
//           <Route
//             path="/s-event"
//             element={<PrivateRoute2 element={SidebarEvent} />}
//           />
//           <Route
//             path="/event"
//             element={<PrivateRoute element={EventDetails} />}
//           />
//           <Route
//             path="/inquiries2"
//             element={<PrivateRoute element={HeaderInquiry} />}
//           />
//           <Route
//             path="/directory"
//             element={<PrivateRoute element={HeaderDirectory} />}
//           />

//           {/* Calculator Routes Wrapped in TotalCostProvider */}
//           <Route
//             path="/Welcome"
//             element={
//               <PrivateRoute
//                 element={() => (
//                   <TotalCostProvider>
//                     <WelcomePage />
//                   </TotalCostProvider>
//                 )}
//               />
//             }
//           />
//           <Route
//             path="/labour"
//             element={
//               <PrivateRoute
//                 element={() => (
//                   <TotalCostProvider>
//                     <LabourAndSupervisorCharges />
//                   </TotalCostProvider>
//                 )}
//               />
//             }
//           />
//           <Route
//             path="/lighting"
//             element={
//               <PrivateRoute
//                 element={() => (
//                   <TotalCostProvider>
//                     <LightingAndElectrician />
//                   </TotalCostProvider>
//                 )}
//               />
//             }
//           />
//           <Route
//             path="/flooring"
//             element={
//               <PrivateRoute
//                 element={() => (
//                   <TotalCostProvider>
//                     <Flooring />
//                   </TotalCostProvider>
//                 )}
//               />
//             }
//           />
//           <Route
//             path="/furniture"
//             element={
//               <PrivateRoute
//                 element={() => (
//                   <TotalCostProvider>
//                     <Furniture />
//                   </TotalCostProvider>
//                 )}
//               />
//             }
//           />
//           <Route
//             path="/transportation"
//             element={
//               <PrivateRoute
//                 element={() => (
//                   <TotalCostProvider>
//                     <Transportation />
//                   </TotalCostProvider>
//                 )}
//               />
//             }
//           />
//           <Route
//             path="/material"
//             element={
//               <PrivateRoute
//                 element={() => (
//                   <TotalCostProvider>
//                     <MaterialCost />
//                   </TotalCostProvider>
//                 )}
//               />
//             }
//           />
//           <Route
//             path="/final"
//             element={
//               <PrivateRoute
//                 element={() => (
//                   <TotalCostProvider>
//                     <FinalCost />
//                   </TotalCostProvider>
//                 )}
//               />
//             }
//           />
//           <Route
//             path="/calculator"
//             element={
//               <PrivateRoute
//                 element={() => (
//                   <TotalCostProvider>
//                     <CalculatorPanel />
//                   </TotalCostProvider>
//                 )}
//               />
//             }
//           />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // AuthContext to provide authentication state
import { TotalCostProvider } from "./contexts/TotalCostContext"; // TotalCostProvider for the calculator routes

// Import pages
import Login from "./pages/Home/Login";
import Signup from "./pages/Home/Signup";
import AdminLogin from "./pages/Home/AdminLogin";
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import HomePage from "./pages/Home/HomePage";
import ViewFiles from "./pages/upload/ViewFiles";
import Upload from "./pages/upload/Upload";
import InquiryForm from "./pages/Inquiry/InquiryForm";
import InquiriesPage from "./pages/Inquiry/InquiriesPage";
import AddDirectory from "./pages/Directory/AddDirectory";
import ViewDirectory from "./pages/Directory/ViewDirectory";
import UpcomingEvents from "./pages/Event/UpcomingEvents";
import EventDetails from "./pages/Event/EventDetails";
import HeaderInquiry from "./pages/Inquiry/HeaderInquiry";
import HeaderDirectory from "./pages/Directory/HeaderDirectory";
import WelcomePage from "./pages/Calculator/WelcomePage";
import LabourAndSupervisorCharges from "./pages/Calculator/LabourAndSupervisorCharges";
import LightingAndElectrician from "./pages/Calculator/LightingAndElectrician";
import Flooring from "./pages/Calculator/Flooring";
import Furniture from "./pages/Calculator/Furniture";
import Transportation from "./pages/Calculator/Transportation";
import MaterialCost from "./pages/Calculator/MaterialCost";
import FinalCost from "./pages/Calculator/FinalCost";
import CalculatorPanel from "./pages/Calculator/CalculatorPanel";
import SidebarEvent from "./pages/Event/SidebarEvent";

// Import the Sidebar component
import Sidebar from "./pages/sidebar/Sidebar";

// Import the PrivateRoute component for protecting routes
import PrivateRoute from "./components/PrivateRoute ";
import PrivateRoute2 from "./components/PrivateRoute2";
import EventWish from "./pages/Event/EventWish";
import Proposal from "./pages/Proposal/Proposal";
import HeaderUpload from "./pages/upload/HeaderUpload";
import HeaderAddEvent from "./pages/Event/HeaderAddEvent";
import HeaderAddDirectory from "./pages/Directory/HeaderAddDirectory";
import StallDocument from "./pages/StallDocument/StallDocument";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes (No Authentication Required) */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/adminlogin" element={<AdminLogin />} />

          {/* Protected Routes (Requires Authentication) */}
          <Route path="/home" element={<PrivateRoute element={HomePage} />} />
          <Route
            path="/form"
            element={<PrivateRoute element={InquiryForm} />}
          />
          <Route path="/view" element={<PrivateRoute element={ViewFiles} />} />
          <Route
            path="/h-Upload"
            element={<PrivateRoute element={HeaderUpload} />}
          />
          <Route
            path="/eventwish"
            element={<PrivateRoute element={EventWish} />}
          />
          <Route
            path="/h-event"
            element={<PrivateRoute element={HeaderAddEvent} />}
          />
          <Route
            path="/inquiries2"
            element={<PrivateRoute element={HeaderInquiry} />}
          />
          <Route
            path="/directory"
            element={<PrivateRoute element={HeaderDirectory} />}
          />
          <Route
            path="/h-add"
            element={<PrivateRoute element={HeaderAddDirectory} />}
          />
          <Route
            path="/proposal"
            element={<PrivateRoute element={Proposal} />}
          />
          <Route
            path="/Stalldocument"
            element={<PrivateRoute element={StallDocument} />}
          />
          <Route
            path="/event"
            element={<PrivateRoute element={EventDetails} />}
          />

          {/* Pages with Sidebar Layout */}
          <Route
            path="/upload"
            element={
              <PrivateRoute2
                element={() => (
                  <div className="flex">
                    <Sidebar />
                    <main className="lg:ml-64 flex-1 min-h-screen transition-colors duration-200">
                      <Upload />
                    </main>
                  </div>
                )}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <PrivateRoute2
                element={() => (
                  <div className="flex">
                    <Sidebar />
                    <main className="lg:ml-64 flex-1 min-h-screen transition-colors duration-200">
                      <AdminPanel />
                    </main>
                  </div>
                )}
              />
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute2
                element={() => (
                  <div className="flex">
                    <Sidebar />
                    <main className="lg:ml-64 flex-1 min-h-screen transition-colors duration-200">
                      <AdminDashboard />
                    </main>
                  </div>
                )}
              />
            }
          />
          <Route
            path="/inquiries"
            element={
              <PrivateRoute2
                element={() => (
                  <div className="flex">
                    <Sidebar />
                    <main className="lg:ml-64 flex-1 min-h-screen transition-colors duration-200">
                      <InquiriesPage />
                    </main>
                  </div>
                )}
              />
            }
          />
          <Route
            path="/add-directory"
            element={
              <PrivateRoute2
                element={() => (
                  <div className="flex">
                    <Sidebar />
                    <main className="lg:ml-64 flex-1 min-h-screen transition-colors duration-200">
                      <AddDirectory />
                    </main>
                  </div>
                )}
              />
            }
          />
          <Route
            path="/view-directory"
            element={
              <PrivateRoute2
                element={() => (
                  <div className="flex">
                    <Sidebar />
                    <main className="lg:ml-64 flex-1 min-h-screen transition-colors duration-200">
                      <ViewDirectory />
                    </main>
                  </div>
                )}
              />
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute2
                element={() => (
                  <div className="flex">
                    <Sidebar />
                    <main className="lg:ml-64 flex-1 min-h-screen transition-colors duration-200">
                      <UpcomingEvents />
                    </main>
                  </div>
                )}
              />
            }
          />
          <Route
            path="/s-event"
            element={
              <PrivateRoute2
                element={() => (
                  <div className="flex">
                    <Sidebar />
                    <main className="lg:ml-64 flex-1 min-h-screen transition-colors duration-200">
                      <SidebarEvent />
                    </main>
                  </div>
                )}
              />
            }
          />

          {/* Calculator Routes Wrapped in TotalCostProvider */}
          <Route
            path="/Welcome"
            element={
              <PrivateRoute
                element={
                  <TotalCostProvider>
                    <WelcomePage />
                  </TotalCostProvider>
                }
              />
            }
          />
          <Route
            path="/labour"
            element={
              <PrivateRoute
                element={
                  <TotalCostProvider>
                    <LabourAndSupervisorCharges />
                  </TotalCostProvider>
                }
              />
            }
          />
          <Route
            path="/lighting"
            element={
              <PrivateRoute
                element={
                  <TotalCostProvider>
                    <LightingAndElectrician />
                  </TotalCostProvider>
                }
              />
            }
          />
          <Route
            path="/flooring"
            element={
              <PrivateRoute
                element={
                  <TotalCostProvider>
                    <Flooring />
                  </TotalCostProvider>
                }
              />
            }
          />
          <Route
            path="/furniture"
            element={
              <PrivateRoute
                element={
                  <TotalCostProvider>
                    <Furniture />
                  </TotalCostProvider>
                }
              />
            }
          />
          <Route
            path="/transportation"
            element={
              <PrivateRoute
                element={
                  <TotalCostProvider>
                    <Transportation />
                  </TotalCostProvider>
                }
              />
            }
          />
          <Route
            path="/material"
            element={
              <PrivateRoute
                element={
                  <TotalCostProvider>
                    <MaterialCost />
                  </TotalCostProvider>
                }
              />
            }
          />
          <Route
            path="/final"
            element={
              <PrivateRoute
                element={
                  <TotalCostProvider>
                    <FinalCost />
                  </TotalCostProvider>
                }
              />
            }
          />
          <Route
            path="/calculator"
            element={
              <PrivateRoute
                element={
                  <TotalCostProvider>
                    <CalculatorPanel />
                  </TotalCostProvider>
                }
              />
            }
          />

          {/* Default Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
