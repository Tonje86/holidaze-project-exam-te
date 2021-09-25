import styles from "./Error.module.css";

export default function ValidationError({ children }) {
    return <div className={styles.valContainer}>{children}</div>;
}
