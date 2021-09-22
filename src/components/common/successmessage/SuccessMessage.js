import styles from "./SuccessMessage.module.css";

function SuccessMessage({ text, paragraph }) {
    return (
        <>
            <div className={styles.success}>
                {text}
                <p className={styles.paragraph}>{paragraph}</p>
            </div>
        </>
    );
}

export default SuccessMessage;
