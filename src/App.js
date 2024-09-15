import{BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Courses from "./Layout/Courses";
import Header from "./Layout/Header";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import ForgetPassword from "./components/Auth/ForgetPassword";
import SetPassword from "./components/Auth/SetPassword";
import Contact from "./Pages/Contact";
import Request from "./Pages/Request";
import About from "./Pages/About";
import Subscribe from "./components/Payments/Subscribe";
import Paymentsfail from "./components/Payments/Paymentsfail";
import Paymentssucess from "./components/Payments/Paymentssucess";
import Notfound from "./components/Not_Found.js/Notfound";
import Course from "./Pages/ContactPage";
import Profilepage from "./components/Profile/Profilepage";
import ChangeProfile from "./components/Profile/ChangeProfile";
import UpdatePassword from "./components/Profile/UpdatePassword";
import Dashboard from "./components/Admin/Dashboard";
import AdminCreateCourse from "./components/Admin/AdminCreateCourse";
import AdminCourse from "./components/Admin/AdminCourse";
import AdminUser from "./components/Admin/AdminUser";
import ViewLecture from "./components/Admin/ViewLecture";
import { useDispatch, useSelector } from "react-redux";
import  toast, {Toaster} from "react-hot-toast" ;
import { ProtectedRoute } from 'protected-route-react';
import {loadUser} from "./Redux/actions/user"
import { useEffect } from "react";
import Loader from "./Layout/Loader";
function App() {
  


  // window.addEventListener('contextmenu', e => {
  //   e.preventDefault();
  // });

  const { isAuthenticated, user, message, error,loading } = useSelector(
    state => state.user
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
  }, [dispatch, error, message]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);




  return (
  <Router>
 {
  loading ? (<Loader/>):(

    <>

    <Header isAuthenticated={isAuthenticated} user={user}/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/courses" element={<Courses/>}/>
      
      <Route path="/login"  element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Login />
                </ProtectedRoute>
              }
            />
      <Route path="/Signup"  element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <Register />
                </ProtectedRoute>
              }/>
      <Route path="/forgetpassword" element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <ForgetPassword />
                </ProtectedRoute>
              }/>
      <Route path="/setpassword/:token"  element={
                <ProtectedRoute
                  isAuthenticated={!isAuthenticated}
                  redirect="/profile"
                >
                  <SetPassword />
                </ProtectedRoute>
              }/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/requestcourse" element={<Request/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/subscribe" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Subscribe user={user}/></ProtectedRoute>}/>
      <Route path="/paymentsf" element={<Paymentsfail/>}/>
      <Route path="/paymentss" element={<Paymentssucess/>}/>
      <Route path="*" element={<Notfound/>}/>
      <Route path="/course/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Course user={user}/></ProtectedRoute>}/>
      <Route path="/profile" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <Profilepage user={user} />
                </ProtectedRoute>
              }/>
      <Route path="/updatepassword" element={<ProtectedRoute isAuthenticated={isAuthenticated}><UpdatePassword user={user}/></ProtectedRoute>}/>
      <Route path="/changeprofile"   element={<ProtectedRoute isAuthenticated={isAuthenticated}><ChangeProfile/></ProtectedRoute>}/> 

      {/* Admin route */}

      <Route path="/admin/dashboard" element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <Dashboard />
                </ProtectedRoute>
              }/>
      <Route path="/admin/createcourse"
      
      element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <AdminCreateCourse/> 
                </ProtectedRoute>
              }/>

      
      
      <Route path="/admin/course" 
      
      element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <AdminCourse/> 
                </ProtectedRoute>
              }/>

      
      <Route path="/admin/user"
      
      element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <AdminUser/>
                </ProtectedRoute>
              }/>
      
      
      <Route path="/admin/viewlecture"
      
      
      element={
                <ProtectedRoute
                  adminRoute={true}
                  isAuthenticated={isAuthenticated}
                  isAdmin={user && user.role === 'admin'}
                >
                  <ViewLecture/>
                </ProtectedRoute>
              }/>
      
       
    
    </Routes>

    <Toaster/>


    </>
  )
 }
  </Router>
  );
}

export default App;
