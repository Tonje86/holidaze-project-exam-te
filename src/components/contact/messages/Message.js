import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { HK_MESSAGE } from "../../../constants/api";
import MainHeading from "../../../typography/MainHeading";
import styles from "./Message.module.css";

const schema = yup.object().shape({
    firstname: yup.string().required("Please fill in your first name").min(2, "The first name must be at least 2 characters"),
    lastname: yup.string().required("Please fill in your last name").min(2, "The last name must be at least 2 characters"),
    email: yup.string().required("Please enter an email address").email("Please enter a valid email address"),
    message: yup.string().required("Please enter your message").min(10, "The message must be at least 10 characters"),
});

function AddMessage() {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    let history = useHistory();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);

        console.log(data);

        try {
            const response = await axios.post(HK_MESSAGE, data);
            console.log("response", response.data);
            history.push("/successmessage");
        } catch (error) {
            console.log("error", error);
            setServerError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <>
            {submitting}
            <div className={styles.messageForm}>
                <MainHeading title="Message us" />
                <form onSubmit={handleSubmit(onSubmit)}>
                    {serverError && <p>{serverError}</p>}

                    <label>First name</label>
                    {errors.firstname && <span>{errors.firstname.message}</span>}
                    <input {...register("firstname")}></input>

                    <label>Last name</label>
                    {errors.lastname && <span>{errors.lastname.message}</span>}
                    <input {...register("lastname")}></input>

                    <label>Email</label>
                    {errors.email && <span>{errors.email.message}</span>}
                    <input {...register("email")}></input>

                    <label>Your message</label>
                    {errors.message && <span>{errors.message.message}</span>}
                    <textarea {...register("message")}></textarea>

                    <button className={styles.submitBtn}>Submit</button>
                </form>
            </div>
        </>
    );
}

export default AddMessage;
