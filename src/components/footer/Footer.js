import styles from "./Footer.module.css";

function Footer() {
    return (
        <div className={styles.footer}>
            <ul className={styles.footerUl}>
                <a href="/">
                    <li className={styles.footerLi}>Home</li>
                </a>
                <a href="/hotels">
                    <li className={styles.footerLi}>Our hotels</li>
                </a>
                <a href="/contact">
                    <li className={styles.footerLi}>Contact us</li>
                </a>
            </ul>
        </div>
    );
}

export default Footer;
