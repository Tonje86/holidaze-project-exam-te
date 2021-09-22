import React from "react";
import dock from "../../images/bergen.jpg";
import styles from "./HomepageImage.module.css";

function HomepageImage() {
    return <img className={styles.image} src={dock} alt="Dock in Bergen" />;
}

export default HomepageImage;
