import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import MainHeading from "../../../typography/MainHeading";
import Loading from "../../common/loading/Loading";
import Error from "../../common/error/Error";
import styles from "./CustomerBookings.module.css";

function CustomerBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const http = useAxios();

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await http.get("bookings?_sort=published_at:DESC");
                console.log("response", response);
                setBookings(response.data);
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>ERROR: Something went wrong </div>;
    }

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

    return (
        <>
            <div>
                <MainHeading title={"Bookings"} />
                <div className={styles.cardContainer}>
                    {bookings.map(function (booking) {
                        return (
                            <div key={booking.id} className={styles.bookingCards}>
                                <p className={styles.bookingName}>{booking.name}</p>
                                <div className={styles.bookingInfo}>
                                    <p>
                                        Name: {booking.firstname} {booking.lastname}
                                    </p>
                                    <p>Arrival: {booking.fromdate}</p>
                                    <p>Departure: {booking.todate}</p>

                                    <p>Phone: {booking.phone}</p>
                                    <p>Email: {booking.email}</p>
                                </div>
                                <p className={styles.date}>{booking.published_at}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default CustomerBookings;
