import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { HK_URL, TOKEN_PATH } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import MainHeading from "../../typography/MainHeading";
import styles from "./Login.module.css";

const loginUrl = HK_URL + TOKEN_PATH;

const schema = yup.object().shape({
    username: yup.string().required("Please enter your username").email("The username must be your email address"),
    password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
    const [submitting, setSubmitting] = useState(false);
    const [loginError, setLoginError] = useState(null);

    const history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const [, setAuth] = useContext(AuthContext);

    async function onSubmit(data) {
        setSubmitting(true);
        setLoginError(null);

        const body = {
            identifier: data.username,
            password: data.password,
        };

        console.log(data);

        try {
            const response = await axios.post(loginUrl, body);
            console.log("response", response.data);
            setAuth(response.data);
            history.push("/admin");
        } catch (error) {
            console.log("error", error);
            setLoginError(error);
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            <fieldset disabled={submitting}>
                <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                    <MainHeading title="Admin login" />
                    {loginError && <span>Wrong username and/or password</span>}

                    <div>
                        <label>Username</label>
                        {errors.username && <span>{errors.username.message}</span>}
                        <input type="username" {...register("username")} />
                    </div>

                    <div>
                        <label>Password</label>
                        {errors.password && <span>{errors.password.message}</span>}
                        <input type="password" {...register("password")} />
                    </div>

                    <button className={styles.loginBtn}>{submitting ? "Loggin in..." : "Login"}</button>
                </form>
            </fieldset>
        </>
    );
}
