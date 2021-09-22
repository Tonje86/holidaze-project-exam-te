import { useState, useEffect } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { HK_MESSAGE, HOTEL_URL } from "../../../constants/api";
import MainHeading from "../../../typography/MainHeading";
import Loading from "../../common/loading/Loading";

function Hoteller() {
    const [hoteller, setHoteller] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    // if (!id) {
    //     history.push("/");
    // }

    const hUrl = HOTEL_URL + "/" + id;

    useEffect(
        function () {
            async function fetchData() {
                const log = {
                    headers: {
                        Authorization:
                            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjMxNTUyMDAwLCJleHAiOjE2MzQxNDQwMDB9.fcTH93uHYOSEVOX801K54tvrIp_fFHnK-Uwx3MQLAiY",
                    },
                };
                try {
                    const response = await fetch(hUrl, log);

                    if (response.ok) {
                        const json = await response.json();
                        console.log(json);
                        setHoteller(json);
                    } else {
                        setError("There was an error");
                    }
                } catch (error) {
                    setError(error.toString());
                } finally {
                    setLoading(false);
                }
            }
            fetchData();
        },
        [hUrl]
    );

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div>ERROR: Something went wrong </div>;
    }
    return (
        <div>
            <MainHeading title="Hoteller" />
            <div>
                {hoteller.map(function (hotell) {
                    return (
                        <>
                            <div key={hotell.id}>
                                <p>{hotell.name}</p>
                            </div>
                            <label>Arrival</label>
                            <input name="fromdate" type="date"></input>

                            <label>Departure</label>
                            <input name="todate" type="date"></input>

                            <label>First name</label>
                            <input name="firstname"></input>

                            <label>Last name</label>
                            <input name="lastname"></input>
                        </>
                    );
                })}
            </div>
        </div>
    );
}

export default Hoteller;
