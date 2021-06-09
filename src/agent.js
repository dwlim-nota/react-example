import axios from "axios";
import commonStore from "./stores/commonStore";
import authStore from "./stores/authStore";

import CONFIG from "./configures/agent.json";

const Auth = {
    // TODO: 뭔가 이 부분에 axios.get 대신에 head 포함해서 날릴 수 있는 다른 뭔가가 있으면 좋을 듯
    current: () => {
        return axios.get("/login/current_user/")
    },
    login: (username, password) => {
        return axios.post("/api/login/", { "username": username, "password": password })
    },
    register: (username, email, password) => {
        return axios.post("/users", { user: { username, email, password } })
    },
    save: user => {
        return axios.put("/user", { user })
    }
}

export default {
    Auth,
}
