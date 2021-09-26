import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import useAxios from "../../../hooks/useAxios";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import MainHeading from "../../../typography/MainHeading";
import Error from "../../common/error/Error";
import styles from "./Establishments.module.css";

const schema = yup.object().shape({
    file: yup
        .mixed()
        .test("name", "File is required", (value) => {
            return value[0] && value[0].name !== "";
        })
        .test("fileSize", "The file is too large", (value) => {
            return value[0] && value[0].size <= 200000;
        }),

    description: yup.string().required("Please fill in description").min(10, "Description must be at least 10 characters long"),
    name: yup.string().required("Please fill in the hotel name"),
    alternative_text: yup.string().required("Please fill in alternative image text"),
    location: yup.string().required("Please fill in the location from the city center"),
    roomsize: yup.number().typeError("Please fill in the roomsize").required(),
    price: yup.string().required("Please fill in the room price"),
    breakfast_included: yup.boolean().typeError("Please choose Yes or No"),
    free_wifi: yup.boolean().typeError("Please choose Yes or No"),
});

const Establishment = () => {
    const [submitting, setSubmitting] = useState(false);
    const [serverError, setServerError] = useState(null);

    let history = useHistory();

    const http = useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        setServerError(null);

        try {
            const formDataToSend = {
                name: data.name,
                description: data.description,
                location: data.location,
                roomsize: data.roomsize,
                roomservice: data.broomservice,
                price: data.price,
                breakfast_included: data.breakfast_included,
                free_wifi: data.free_wifi,
                alternative_text: data.alternative_text,
            };

            const inputValue = await http({
                method: "POST",
                url: "hotels",
                data: formDataToSend,
            });

            const id = inputValue.data.id;

            const formData = new FormData();
            formData.append("files", data.file[0]);
            formData.append("ref", "hotel");
            formData.append("refId", id);
            formData.append("field", "images");

            const response = await http({
                method: "POST",
                url: "upload",
                data: formData,
            });

            console.log("Success", response);

            history.push("/establishmentsuccess");
        } catch (error) {
            console.log("error", error);
            setServerError(error.toString());
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <MainHeading title="Create new establishments" />
            <div className={styles.hotelForm}>
                <fieldset disabled={submitting}>
                    {serverError && <Error />}
                    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                        <label>Image (max 200kb)</label>
                        {errors.file && <span>{errors.file.message}</span>}
                        <input name="file" type="file" {...register("file")}></input>

                        <label>Alternative image text</label>
                        {errors.alternative_text && <span>{errors.alternative_text.message}</span>}
                        <input name="alternative_text" type="alternative_text" {...register("alternative_text")}></input>

                        <label>Breakfast included</label>
                        {errors.breakfast_included && <span>{errors.breakfast_included.message}</span>}
                        <div className={styles.radioBtns}>
                            <div className={styles.inputContainer}>
                                <input
                                    type="radio"
                                    name="breakfast_included"
                                    id="breakfast_included"
                                    value="true"
                                    {...register("breakfast_included")}
                                ></input>
                                <label htmlFor="breakfast_included"> Yes</label>
                            </div>

                            <div className={styles.inputContainer}>
                                <input
                                    type="radio"
                                    name="breakfast_included"
                                    id="breakfast_not_included"
                                    value="false"
                                    {...register("breakfast_included")}
                                ></input>
                                <label htmlFor="breakfast_not_included">No</label>
                            </div>
                        </div>

                        <label>Free wifi</label>
                        {errors.free_wifi && <span>{errors.free_wifi.message}</span>}
                        <div className={styles.radioBtns}>
                            <div className={styles.inputContainer}>
                                <input type="radio" name="free_wifi" id="free_wifi" value="true" {...register("free_wifi")}></input>
                                <label htmlFor="free_wifi"> Yes</label>
                            </div>

                            <div className={styles.inputContainer}>
                                <input type="radio" name="free_wifi" id="not_free_wifi" value="false" {...register("free_wifi")}></input>
                                <label htmlFor="not_free_wifi">No</label>
                            </div>
                        </div>

                        <label>Hotel name</label>
                        {errors.name && <span>{errors.name.message}</span>}
                        <input name="name" type="name" {...register("name")}></input>

                        <label>Description</label>
                        {errors.description && <span>{errors.description.message}</span>}
                        <textarea name="description" type="description" {...register("description")}></textarea>

                        <label>Location (km)</label>
                        {errors.location && <span>{errors.location.message}</span>}
                        <input name="location" type="location" {...register("location")} placeholder="Eks: 10km from downtown"></input>

                        <label>Roomsize (kvm)</label>
                        {errors.roomsize && <span>{errors.roomsize.message}</span>}
                        <input name="roomsize" type="roomsize" {...register("roomsize")}></input>

                        <label>Price (NOK)</label>
                        {errors.price && <span>{errors.price.message}</span>}
                        <input name="price" type="price" {...register("price")}></input>

                        <button className={styles.submitBtn}>{submitting ? "Submitting..." : "Submit"}</button>
                    </form>
                </fieldset>
            </div>
        </>
    );
};

export default Establishment;
