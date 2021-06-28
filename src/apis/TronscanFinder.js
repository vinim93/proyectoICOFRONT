import axios from "axios";

export default axios.create({
    baseURL: "https://apilist.tronscan.org",
});
