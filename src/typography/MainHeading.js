import styles from "./MainHeading.module.css";

function MainHeading({ title }) {
    return <h1 className={styles.heading}>{title}</h1>;
}

export default MainHeading;
