import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import logo from "../../icons/holidaze-logo.svg";
import hotelbed from "../../icons/hotelbed.svg";
import contact from "../../icons/contact-envelope.svg";
import login from "../../icons/login-icon.svg";
import loggingout from "../../icons/logout-icon.svg";
import bookings from "../../icons/customer-bookings.svg";
import messages from "../../icons/customer-messages.svg";
import newhotel from "../../icons/new-establishments.svg";
import styles from "./Nav.module.css";

function Nav() {
    const [auth, setAuth] = useContext(AuthContext);

    const history = useHistory();

    function logout() {
        setAuth(null);
        history.push("/");
    }

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.placeNav}>
                    <NavLink exact to="/">
                        <img className={styles.logo} src={logo} alt="Holidaze logo" />
                    </NavLink>
                    <NavLink to="/hotels" activeClassName={styles.active}>
                        <img className={styles.bed} src={hotelbed} alt="Bed icon" />
                    </NavLink>
                    <NavLink to="/contact" activeClassName={styles.active}>
                        <img className={styles.contact} src={contact} alt="Letter icon" />
                    </NavLink>

                    {auth ? (
                        <>
                            <img className={styles.loggingout} src={loggingout} alt="Logout icon" onClick={logout} title="Click to log out" />

                            <div className={styles.border}></div>

                            <p className={styles.admintext}>Admin panel</p>

                            <NavLink to="/messages" activeClassName={styles.adminactive}>
                                <img className={styles.adminIcon} src={messages} alt="letter icon" />
                            </NavLink>
                            <NavLink to="/bookings" activeClassName={styles.adminactive}>
                                <img className={styles.adminIcon} src={bookings} alt="bed icon" />
                            </NavLink>
                            <NavLink to="/establishments" activeClassName={styles.adminactive}>
                                <img className={styles.adminIcon} src={newhotel} alt="house icon" />
                            </NavLink>
                        </>
                    ) : (
                        <NavLink to="/login" activeClassName={styles.active}>
                            <img className={styles.login} src={login} alt="Login icon" />
                        </NavLink>
                    )}
                </div>
            </nav>
        </>
    );
}

export default Nav;
