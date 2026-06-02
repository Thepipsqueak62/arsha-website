import axios from "axios";

const response = await axios.get(
    `https://public-api.tracker.gg/v2/valorant/standard/profile/riot/Jessica%231113`,
    {
        headers: {
            "TRN-Api-Key": "004a0e0d-f2c1-4799-a6c4-ad443b1cd5dc"
        },
        params: {
            playlist: "competitive",
            season: "ce2783e8-44fc-dd48-3da3-33b5ba6c4a22"
        }
    }
);