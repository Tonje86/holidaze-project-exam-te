import SuccessMessage from "../../../common/successmessage/SuccessMessage";
import styles from "./MessageSuccess.module.css";

export function MessageSuccess() {
    return (
        <>
            <div className={styles.container}>
                <SuccessMessage text="Thank you, we have received your message" paragraph="We will contact you as soon as we can " />

                <a href="/">
                    <button className={styles.returnBtn}>Return home</button>
                </a>
            </div>
        </>
    );
}
