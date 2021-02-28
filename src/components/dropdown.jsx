import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./dropdown.module.css";

const GetCountry = ({handleCountry}) => {
    const [listCountry, setListCountry] = useState(false);

    useEffect(() => {
        axios
            .get("https://covid19.mathdro.id/api/countries")
            .then((result) => {
                setListCountry(result.data.countries)
            })
            .catch((error) => {
                if (error.response) {
                  console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);
                } else if (error.request) {
                  console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
            });
    }, []);

    if (!listCountry) {
        return (
        <div className={styles.loading}>
          <h5>Fetch country list...</h5>
        </div>
        )
    }

    return (
        <>
        <select className={styles.dropdown} name="Country" id="dropdown" placeholder="fdsafdsafdsafdsa">
            <option className={styles.select} value="false" onClick={handleCountry}>
             Worldwide
            </option>
            {listCountry.map((val) => {
                return (
                    <option value={val.name} onClick={handleCountry}>
                        {val.name}
                    </option>
                );
            })}
        </select>
        </>
    );
};

export default GetCountry;
