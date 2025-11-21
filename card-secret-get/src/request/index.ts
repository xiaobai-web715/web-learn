import axios from "axios";

export const getReceiveRequest = (tag: string) => {
    return axios.get<{
        success: boolean;
        message: string;
        card_type: string;
        card_code: string;
    }>(`/api/carmine/free/get/${tag}`);
};
