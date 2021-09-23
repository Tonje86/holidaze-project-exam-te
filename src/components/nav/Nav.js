import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import logo from "../../holidaze_logo.svg";
import bed from "../../icons/Bed.svg";
import contact from "../../icons/Contact.svg";
import login from "../../icons/login.svg";
import loginactive from "../../icons/Loginactive.svg";
import bookings from "../../icons/SVG/seng.svg";
import messages from "../../icons/SVG/brev.svg";
import newhotel from "../../icons/SVG/ramme.svg";
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
                        <img className={styles.bed} src={bed} alt="Bed icon" />
                    </NavLink>
                    <NavLink to="/contact" activeClassName={styles.active}>
                        <img className={styles.contact} src={contact} alt="Letter icon" />
                    </NavLink>

                    {auth ? (
                        <>
                            <NavLink to="/admin" activeClassName={styles.active}>
                                <img className={styles.loginactive} src={loginactive} alt="Login icon" />
                            </NavLink>
                            <div className={styles.border}></div>
                            <button className={styles.logoutBtn} onClick={logout}>
                                Log out
                            </button>
                            <NavLink to="/messages" activeClassName={styles.active}>
                                <img className={styles.bed} src={messages} alt="letter icon" />
                                {/* <button className={styles.adminBtns}>Customer Messages</button> */}
                            </NavLink>
                            <NavLink to="/bookings" activeClassName={styles.adminactive}>
                                <img className={styles.bed} src={bookings} alt="bed icon" />
                                {/* <button className={styles.adminBtns}>Customer Bookings</button> */}
                            </NavLink>
                            <NavLink to="/establishments" activeClassName={styles.adminactive}>
                                <img className={styles.bed} src={newhotel} alt="house icon" />
                                {/* <button className={styles.adminBtns}>New Establishments</button> */}
                            </NavLink>
                        </>
                    ) : (
                        <NavLink to="/login" activeClassName={styles.active}>
                            <img className={styles.login} src={login} alt="Login icon" />
                        </NavLink>
                    )}
                </div>
                <div className={styles.border}></div>
            </nav>
        </>
    );
}

export default Nav;
