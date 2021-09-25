import { Link } from "react-router-dom";
import styles from "./InfoText.module.css";

function InfoText() {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.infoText}>
                    We are here to help you{" "}
                    <Link to="/hotels" className={styles.contactLink}>
                        find{" "}
                    </Link>{" "}
                    the best stay in Bergen that suits your needs and budget.
                </p>
            </div>
        </>
    );
}
export default InfoText;
