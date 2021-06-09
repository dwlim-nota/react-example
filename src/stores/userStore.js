import { observable, action, reaction } from "mobx";
import agent from "../agent";

class UserStore {
    @observable currentUser
    @observable currentEmail
    @observable currentIsSuperUser
    @observable loadingUser
    @observable updatingUser
    @observable updatingUserErrors

    @action pullUser() {
        this.loadingUser = true
        return agent.Auth.current()
            .then(action(({ username, email, is_superuser }) => {
                console.log(email)
                this.currentUser = username
                this.currentEmail = email
                this.currentIsSuperUser = is_superuser
            }))
            .finally(action(() => { this.loadingUser = false }))
    }

    @action updateUser(newUser) {
        this.updatingUser = true
        return agent.Auth.save(newUser)
            .then(action(({ username }) => { this.currentUser = username }))
            .finally(action(() => { this.updatingUser = false }))
    }

    @action forgetUser() {
        this.currentUser = undefined
    }
}

export default new UserStore()