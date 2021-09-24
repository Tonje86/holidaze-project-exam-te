import { Link } from "react-router-dom";
import styles from "./Hotels.module.css";

function HotelItem({ id, images, name, price, location, alternative_text }) {
    return (
        <div>
            <img src={images[0].url} alt={alternative_text} className={styles.detailImg} />
            <Link to={`detail/${id}`} className={styles.link}>
                <h2 className={styles.hotelname}>{name}</h2>
            </Link>

            <p>{location}</p>
            <div className={styles.priceBtn}>Price from {price}NOK</div>

            <Link to={`detail/${id}`} className={styles.link}>
                View more details
            </Link>
        </div>
    );
}

export default HotelItem;
