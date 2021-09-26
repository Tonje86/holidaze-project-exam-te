import MainHeading from "../../typography/MainHeading";
import MessageForm from "./messages/MessageForm";
import styles from "./Contact.module.css";

function Contact() {
    return (
        <>
            <MessageForm />
            <div className={styles.contactContainer}>
                <div className={styles.contactCards}>
                    <MainHeading title="Call us" />
                    <a href="tel: +47 123 45 678">
                        <p className={styles.contactText}>+47 123 45 678</p>
                    </a>
                </div>

                <div className={styles.contactCards}>
                    <MainHeading title="Address" />
                    <p className={styles.contactText}>Holidaze Bergen</p>
                    <p className={styles.contactText}>Bergen Road 123</p>
                    <p className={styles.contactText}>4567 Bergen</p>
                </div>
            </div>
        </>
    );
}

export default Contact;
