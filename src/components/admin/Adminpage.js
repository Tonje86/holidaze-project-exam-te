import MainHeading from "../../typography/MainHeading";
import styles from "./Adminpage.module.css";

function Adminpage() {
    return (
        <>
            <div className={styles.heading}>
                <MainHeading title="Welcome admin" />
            </div>
        </>
    );
}

export default Adminpage;
