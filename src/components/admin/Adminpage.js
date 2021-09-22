import MainHeading from "../../typography/MainHeading";
import NewEstablishment from "./establishments/Establishments";
import styles from "./Adminpage.module.css";

function Adminpage() {
    return (
        <>
            <div className={styles.heading}>
                <MainHeading title="Welcome admin" />
            </div>
            <NewEstablishment />
        </>
    );
}

export default Adminpage;
