import React, {useState,useEffect} from 'react';
import {Select,FormControl} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import styles from './CountryPicker.module.css';
import {fetchCountries} from '../../api';


const CountryPicker = ({handleCountryChange}) => {

    const [fetchedCountries, setFetchedCountries] = useState([]);


    useEffect(() => {
        const fetchAPI = async () => {
            setFetchedCountries(await fetchCountries());
        }


        fetchAPI();
    },[setFetchedCountries]);


    return (
        <FormControl className={styles.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Location</InputLabel>
            <Select defaultValue='' onChange={(e) => handleCountryChange(e.target.value)}>
                <option  className={styles.optionStyle}  value= " " > Global </option>
                {fetchedCountries.map((country, i) => <option className={styles.optionStyle} key = {i} value = {country}> {country} </option>)}
            </Select>
        </FormControl>
    )
}

export default CountryPicker;

