import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { HK_BOOKINGS, HOTEL_URL } from "../../../../constants/api";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import Loading from "../../../common/loading/Loading";
import Error from "../../../common/error/Error";
import MainHeading from "../../../../typography/MainHeading";
import SubHeading from "../../../../typography/SubHeading";
import styles from "../../booking/form/BookHotel.module.css";

const schema = yup.object().shape({
    name: yup.string(),
    firstname: yup.string().required("Please fill in your first name").min(2, "The first name must be at least 2 characters"),
    lastname: yup.string().required("Please fill in your last name").min(2, "The last name must be at least 2 characters"),
    email: yup.string().required("Please enter your email address").email("Please enter a valid email address"),
    phone: yup.number().typeError("Please enter your phone number").required(),
    fromdate: yup.date().typeError("Please enter your arrival date").required(),
    todate: yup.date().typeError("Please enter your departure date").required(),
});

function BookHotel() {
    const [hotel, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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

    const { id } = useParams();

    if (!id) {
        history.push("/");
    }

    const getHotelUrl = HOTEL_URL + "/" + id;

    useEffect(
        function () {
            async function fetchHotel() {
                try {
                    const response = await fetch(getHotelUrl);

                    if (response.ok) {
                        const json = await response.json();
                        // console.log(json);
                        setHotel(json);
                    } else {
                        setError("Error");
                    }
                } catch (error) {
                    setError(error.toString());
                } finally {
                    setLoading(false);
                }
            }
            fetchHotel();
        },
        [getHotelUrl]
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    async function onSubmit(data) {
        setSubmitting(true);
        setServerError(null);
        // console.log(data);

        const include = {
            name: hotel.name,
            ...data,
        };

        // console.log(data);

        try {
            const response = await axios.post(HK_BOOKINGS, include, data);
            // console.log("response", response.data);
            history.push("/bookingdone");
        } catch (error) {
            // console.log("error", error);
            setServerError(error.toString());
        } finally {
            setSubmitting(false);
        }
    }

    if (hotel.breakfast_included === true) {
        hotel.breakfast_included = "Breakfast included";
    } else if (hotel.breakfast_included === false) {
        hotel.breakfast_included = "Breakfast costs extra";
    }

    return (
        <>
            <fieldset disabled={submitting}>
                <form className={styles.bookForm} onSubmit={handleSubmit(onSubmit)}>
                    {serverError && <p>{serverError}</p>}
                    <Link to={`../detail/${id}`} className={styles.backLink}>
                        Back to hotel details
                    </Link>
                    <MainHeading title={hotel.name} />
                    <div className={styles.bookingForm}>
                        <label>Arrival</label>
                        {errors.fromdate && <span>{errors.fromdate.message}</span>}
                        <input name="fromdate" type="date" {...register("fromdate")}></input>

                        <label>Departure</label>
                        {errors.todate && <span>{errors.todate.message}</span>}
                        <input name="todate" type="date" {...register("todate")}></input>

                        <label>First name</label>
                        {errors.firstname && <span>{errors.firstname.message}</span>}
                        <input name="firstname" {...register("firstname")}></input>

                        <label>Last name</label>
                        {errors.lastname && <span>{errors.lastname.message}</span>}
                        <input name="lastname" {...register("lastname")}></input>

                        <label>Phone number</label>
                        {errors.phone && <span>{errors.phone.message}</span>}
                        <input {...register("phone")}></input>

                        <label>Email</label>
                        {errors.email && <span>{errors.email.message}</span>}
                        <input {...register("email")}></input>

                        <button className={styles.submitBtn}>{submitting ? "Booking..." : "Book"}</button>

                        <SubHeading title="Details" />
                        <div className={styles.detailCard}>
                            <ul className={styles.detailListUl}>
                                <li className={styles.detailListLi}>- {hotel.location}</li>
                                <li className={styles.detailListLi}>- {hotel.breakfast_included}</li>
                                <li className={styles.detailListLi}>- Roomsize: {hotel.roomsize}kvm</li>
                                <li className={styles.price}>Price: {hotel.price} NOK</li>
                            </ul>
                        </div>
                    </div>
                </form>
            </fieldset>
        </>
    );
}

export default BookHotel;
