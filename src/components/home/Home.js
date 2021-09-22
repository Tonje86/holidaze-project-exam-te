import MainHeading from "../../typography/MainHeading";
import InfoText from "./InfoText";
import HomepageImage from "./HomepageImage";
import styles from "./Home.module.css";

function Home() {
    return (
        <>
            <div className={styles.container}>
                <MainHeading title="Welcome to Holidaze" />
                <InfoText />
                <HomepageImage />
            </div>
        </>
    );
}

export default Home;
