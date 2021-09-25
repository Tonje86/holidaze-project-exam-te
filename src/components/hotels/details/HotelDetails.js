import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { HOTEL_URL } from "../../../constants/api";
import axios from "axios";
import Loading from "../../common/loading/Loading";
import Error from "../../common/error/Error";
import MainHeading from "../../../typography/MainHeading";
import styles from "./HotelDetails.module.css";

function HotelDetails() {
    const [hotel, setHotel] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let history = useHistory();

    const { id } = useParams();

    if (!id) {
        history.push("/");
    }

    const hotelDetailUrl = HOTEL_URL + "/" + id;

    useEffect(function () {
        async function getHotelDetails() {
            try {
                const response = await axios.get(hotelDetailUrl);
                console.log("response", response);
                setHotel(response.data);
            } catch (error) {
                console.log(error);
                setError(error);
            } finally {
                setLoading(false);
            }
        }

        getHotelDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (error) return <Error />;

    if (loading) return <Loading />;

    if (hotel.breakfast_included === true) {
        hotel.breakfast_included = "Breakfast included";
    } else if (hotel.breakfast_included === false) {
        hotel.breakfast_included = "Breakfast costs extra";
    }

    if (hotel.free_wifi === true) {
        hotel.free_wifi = "Free wifi";
    } else if (hotel.free_wifi === false) {
        hotel.free_wifi = "Wifi costs extra";
    }

    return (
        <>
            <MainHeading title={hotel.name} />
            <div className={styles.detailCard}>
                <Link to="/hotels" className={styles.backLink}>
                    Back to all hotels
                </Link>
                <img src={hotel.images[0].url} alt={hotel.alternative_text} className={styles.detailCardImg} />
                <p>{hotel.description}</p>
                <ul className={styles.detailListUl}>
                    <li className={styles.detailListLi}>{hotel.location}</li>
                    <li className={styles.detailListLi}>Roomsize: {hotel.roomsize}kvm</li>
                    <li className={styles.detailListLi}>Price from: {hotel.price} NOK</li>
                    <li className={styles.detailListLi}>{hotel.breakfast_included}</li>
                    <li className={styles.detailListLi}>{hotel.free_wifi}</li>
                </ul>
                <Link to={`../booking/${id}`} className={styles.bookBtn}>
                    Book this hotel
                </Link>
            </div>
        </>
    );
}

export default HotelDetails;
