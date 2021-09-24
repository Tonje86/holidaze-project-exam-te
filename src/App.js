import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Nav from "./components/nav/Nav";
import Hotels from "./components/hotels/Hotels";
import HotelDetails from "./components/hotels/details/HotelDetails";
import Contact from "./components/contact/Contact";
import Login from "./components/login/Login";
import Adminpage from "./components/admin/Adminpage";
import Establishments from "./components/admin/establishments/Establishments";
import Home from "./components/home/Home";
import CustomerMessages from "./components/admin/messages/CustomerMessages";
import CustomerBookings from "./components/admin/bookings/CustomerBookings";
import BookHotel from "./components/hotels/booking/form/BookHotel";
import { BookingComplete } from "./components/hotels/booking/bookingdone/BookingComplete";
import { SuccessEstablishment } from "./components/admin/establishments/establishmentsuccess/SuccessEstablishments";
import { MessageSuccess } from "./components/contact/messages/successmessage/MessageSuccess";
import Footer from "./components/footer/Footer";
import styles from "./components/layout/Box.module.css";
import "./App.css";

function App() {
    return (
        <>
            <AuthProvider>
                <Router>
                    <Nav />
                    <Switch>
                        <Route path="/hotels">
                            <Hotels />
                        </Route>
                        <Route path="/detail/:id">
                            <HotelDetails />
                        </Route>
                        <Route path="/booking/:id">
                            <BookHotel />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/admin">
                            <Adminpage />
                        </Route>
                        <Route path="/messages">
                            <CustomerMessages />
                        </Route>
                        <Route path="/successmessage">
                            <MessageSuccess />
                        </Route>
                        <Route path="/bookings">
                            <CustomerBookings />
                        </Route>
                        <Route path="/bookingdone">
                            <BookingComplete />
                        </Route>
                        <Route path="/establishments">
                            <Establishments />
                        </Route>
                        <Route path="/establishmentsuccess">
                            <SuccessEstablishment />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </Router>
                <div className={styles.box}></div>
                <Footer />
            </AuthProvider>
        </>
    );
}

export default App;
