import styles from "./Error.module.css";

function Error() {
    return (
        <div className={styles.container}>
            <div className={styles.textBox}>Sorry, there was an unexpected error</div>
        </div>
    );
}

export default Error;
