import { useState, useEffect } from "react";
import axios from "axios";
import { HOTEL_URL } from "../../constants/api";
import SearchHotels from "./SearchHotels";
import Loading from "../common/loading/Loading";
import Error from "../common/error/Error";
import styles from "./Hotels.module.css";

export default function CallHotels() {
    const [hotels, setHotels] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(function () {
        async function getHotels() {
            try {
                const response = await axios.get(HOTEL_URL + "?_sort=name:ASC");
                console.log("response", response);
                setHotels(response.data);
            } catch (error) {
                setError(error.toString());
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        }

        getHotels();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (loading) return <Loading />;

    if (error) return <Error />;

    const filteredHotels = search.length === 0 ? hotels : hotels.filter((hotel) => hotel.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <div>
            <label htmlFor="hotel-search">
                <span className={styles.hidden}>Search for hotel</span>
            </label>

            <input className={styles.bar} type="text" placeholder="Search for hotel" value={search} onChange={(e) => setSearch(e.target.value)} />

            <SearchHotels hotels={filteredHotels} />
        </div>
    );
}
