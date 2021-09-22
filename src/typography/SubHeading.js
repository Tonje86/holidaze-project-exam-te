import styles from "./SubHeading.module.css";

function SubHeading({ title }) {
    return <h2 className={styles.heading}>{title}</h2>;
}
export default SubHeading;
