import { useState, useEffect } from "react";
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
        async function fetchData() {
            try {
                const response = await fetch(HOTEL_URL + "?_sort=name:ASC");

                if (response.ok) {
                    const json = await response.json();
                    console.log(json);
                    setHotels(json);
                } else {
                    setError("Error");
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredHotels = search.length === 0 ? hotels : hotels.filter((hotel) => hotel.name.toLowerCase().includes(search.toLowerCase()));

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <Error />;
    }

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
