import { Link } from "react-router-dom";
import styles from "./InfoText.module.css";

function InfoText() {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.infoText}>We are here to help you to find the best stay in Bergen that suits your needs and budget.</p>
                <p className={styles.infoText}>
                    You can search and book hotels, bed and breakfast and guesthouses. Do not hesitate to{" "}
                    <Link to="/contact" className={styles.contactLink}>
                        contact us
                    </Link>
                    if you have questions.
                </p>
            </div>
        </>
    );
}
export default InfoText;
