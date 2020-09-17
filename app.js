const app = new Vue({
    el: "#app",
    data: {
        loggedin: false, 
        JWT: "",
        loginUN: "",
        loginPW: "",
        createUN: "",
        createPW: "",
        devURL: "http://localhost:8000",
        prodURL: null,
        user: null,
        token: null
    }, 
    methods: {
        handleLogin: function(){
            const URL = this.prodURL ? this.prodURL : this.devURL
            console.log(URL)
            const user = {username: this.loginUN, password: this.loginPW}
            console.log(user)
            fetch(`${URL}/auth/users/login/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                this.user = data,user 
                this.token = data.token
                this.loggedin = true 

                //UNCOMMENT WHEN ADDING FINISHING TOUCHES
                // this.loginUN = ""
                // this.loginPW = ""
                //The above just resets username and password 
                
            })
        },
        handleLogout: function(){
            this.loggedin=false
            this.user=null
            this.token=null
        },
        handleSignup: function(){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const user = {username: this.createUN, password: this.createPW}

            fetch(`${URL}/auth/users/register/`, {
             method: "POST",
             headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(user)

             })
             .then(response => response.json())
             .then(data => {
                 console.log(data)
             })

            //  alert("SIGNUP SUCCESSFUL")

        }
    }
})