import { useState, useEffect } from "react";
import useAxios from "../../../hooks/useAxios";
import MainHeading from "../../../typography/MainHeading";
import Loading from "../../common/loading/Loading";
import Error from "../../common/error/Error";
import styles from "./CustomerMessages.module.css";

function CustomerMessages() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const http = useAxios();

    useEffect(function () {
        async function fetchData() {
            try {
                const response = await http.get("messages?_sort=published_at:DESC");
                console.log("response", response);
                setMessages(response.data);
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
        return <Error />;
    }
    return (
        <>
            <div>
                <MainHeading title="Messages" />
                <div className={styles.cardContainer}>
                    {messages.map(function (message) {
                        return (
                            <div key={message.id} className={styles.messageCards}>
                                <p className={styles.messageName}>
                                    Message from {message.firstname} {message.lastname}
                                </p>
                                <p className={styles.date}>{message.created_at}</p>
                                <p className={styles.message}>{message.message}</p>
                                <button className={styles.replyBtn}>Reply</button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default CustomerMessages;
