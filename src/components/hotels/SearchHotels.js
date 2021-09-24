import HotelItem from "./HotelItem";
import styles from "./Hotels.module.css";

export default function SearchHotels({ hotels }) {
    return (
        <div className={styles.container}>
            {hotels.map(function (hotel) {
                const { id, images, name, price, location, alternative_text } = hotel;
                return (
                    <div className={styles.hotelCard} key={id}>
                        <HotelItem id={id} images={images} name={name} price={price} location={location} alternative_text={alternative_text} />
                    </div>
                );
            })}
        </div>
    );
}
