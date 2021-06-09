import { observable, action } from "mobx";
import agent from "../agent";
import userStore from "./userStore";
import commonStore from "./commonStore";

class AuthStore {
    @observable inProgress = false
    @observable errors = undefined
    @observable someVariable

    @action setSomeVariable(variable){
        this.someVariable = variable
    }

    @observable values = {
        username: "",
        email: "",
        password: "",
        company: "",
        isSuperuser: ""
    }

    @action setUsername(username) {
        this.values.username = username
    }

    @action setEmail(email) {
        this.values.email = email
    }

    @action setPassword(password) {
        this.values.password = password
    }

    @action setCompany(company) {
        this.values.company = company
    }

    @action setIsSuperuser(isSuperuser){
        this.values.isSuperuser = isSuperuser
    }

    @action reset() {
        this.values.username = ""
        this.values.email = ""
        this.values.password = ""
    }

    @action login() {
        this.inProgress = true
        this.errors = undefined
        return agent.Auth.login(this.values.username, this.values.password)
            .then(res => commonStore.setToken(res.token))
            .then(() => userStore.pullUser())
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors
                throw err
            }))
            .finally(action(() => { this.inProgress = false }))
    }

    @action register() {
        this.inProgress = true
        this.errors = undefined
        return agent.Auth.register(this.values.username, this.values.email, this.values.password)
            .then(({ user }) => commonStore.setToken(user.toekn))
            .then(() => userStore.pullUser())
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors
                throw err
            }))
            .finally(action(() => { this.inProgress = false }))
    }

    @action logout() {
        commonStore.setToken(undefined)
        userStore.forgetUser()
        return Promise.resolve()
    }
}

export default new AuthStore()