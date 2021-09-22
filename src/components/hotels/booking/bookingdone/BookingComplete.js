import SuccessMessage from "../../../common/successmessage/SuccessMessage";
import styles from "./BookingComplete.module.css";

export function BookingComplete() {
    return (
        <>
            <div className={styles.container}>
                <SuccessMessage
                    text="Thank you, your booking is now confirmed"
                    paragraph=" You will receive an email shortly with your booking information. Please contact us if you dont receive anything or just have any
                questions"
                />

                <a href="/">
                    <button className={styles.returnBtn}>Return home</button>
                </a>
            </div>
        </>
    );
}
