import React, {useState, createContext} from 'react';
import PlacesFinder from "../apis/PlacesFinder";


export const ProfileContext = createContext();

export const ProfileContextProvider = props => {
    const [croppedImage, setCroppedImage] = useState(null);
    const [image, setImage] = useState("");
    const [profileStatus, setProfileStatus] = useState(0);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [birthday, setBirthday] = useState("");
    const [country, setCountry] = useState("");
    const [countryCompleteName, setCountryCompleteName] = useState("");
    const [stateLocation, setStateLocation] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [countriesAPI, setCountriesAPI] = useState([]);
    const [statesAPI, setStatesAPI] = useState([]);
    const [fileFirestore, setFileFirestore] = useState(null);
    const [fileObject, setFileObject] = useState("");
    const [uploadValue, setUploadValue] = useState(0);
    const [jalaPorfavor, setAuthToken] = useState("");

    const getStatesAPI = async (countryAPI) => {
        try {
            const response = await PlacesFinder.get(`/api/states/${countryAPI}`, {
                headers: {
                    Authorization: jalaPorfavor
                }
            });
            setStatesAPI(response.data);
        } catch (e) {

        }
    }

    const value = {
        croppedImage, setCroppedImage,
        image, setImage,
        profileStatus, setProfileStatus,
        name, setName,
        lastname, setLastname,
        birthday, setBirthday,
        country, setCountry,
        countryCompleteName, setCountryCompleteName,
        stateLocation, setStateLocation,
        city, setCity,
        phone, setPhone,
        address, setAddress,
        countriesAPI, setCountriesAPI,
        statesAPI, setStatesAPI,
        fileFirestore, setFileFirestore,
        fileObject, setFileObject,
        uploadValue, setUploadValue,
        jalaPorfavor, setAuthToken,
        getStatesAPI
    }

    return (
        <ProfileContext.Provider value={value}>
            {props.children}
        </ProfileContext.Provider>
    )
}
