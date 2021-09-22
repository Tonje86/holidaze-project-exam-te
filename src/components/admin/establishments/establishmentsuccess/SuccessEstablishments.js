import SuccessMessage from "../../../common/successmessage/SuccessMessage";
import styles from "./SuccessEstablishment.module.css";

export function SuccessEstablishment() {
    return (
        <>
            <div className={styles.container}>
                <SuccessMessage text="Hurray, establishment created successfully" />
                <a href="/establishments">
                    <button className={styles.newEstablishmentsBtn}>Create new establishments</button>
                </a>

                <a href="/">
                    <button className={styles.returnBtn}>Return home</button>
                </a>
            </div>
        </>
    );
}
