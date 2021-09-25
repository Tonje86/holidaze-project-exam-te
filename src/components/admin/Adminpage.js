import MainHeading from "../../typography/MainHeading";
import styles from "./Adminpage.module.css";

function Adminpage() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.adminWelcome}>
                    <MainHeading title="Welcome admin" />
                </div>
            </div>
        </>
    );
}

export default Adminpage;
