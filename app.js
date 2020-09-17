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
        token: null,
        quizzes: [],
        newQuiz: "",
        quizDirection: ""
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

            if (this.loginUN === "" && this.loginPW === ""){

                    alert("error logging in")

            } else {

                this.user = data.user
                this.token = data.token
                this.loggedin = true 
                this.getQuizzes()

                //UNCOMMENT WHEN ADDING FINISHING TOUCHES
                this.loginUN = ""
                this.loginPW = ""
                //The above just resets username and password 
                }
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

                 if(this.createPW === "" && this.createUN === "" || data.error){
                 alert("SIGNUP UNSUCCESSFUL")
                 } else {
                    alert("SIGNUP SUCCESSFUL")
                 this.createPW = ""
                 this.createUN = ""
                 }
             })

            //  

        },
        getQuizzes: function(){
            const URL = this.prodURL ? this.prodURL : this.devURL

        fetch(`${URL}/quiz/quiz/`, {
                method: "GET",
                headers:{
                    Authorization: `JWT ${this.token}`
                },
                body: JSON.stringify()
            })
            .then(response => response.json())
            .then(data => {
                
                this.quizzes = data
            })
        }, 
        createQuiz: function(){
            const URL = this.prodURL ? this.prodURL : this.devURL

            const quiz = { directions: this.quizDirection, name: this.newQuiz}
            fetch(`${URL}/quiz/quiz/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${this.token}`
                }, 
                body: JSON.stringify(quiz)
            })
            .then(response => {
                this.newQuiz = ""
                this.quizDirection = ""
                this.getQuizzes()
            })
        }, 
        // updateQuiz: function(){
        //     const URL = this.prodURL ? this.prodURL : this.devURL
        //     const id = event.target.id 

        //     fetch(`${URL}/quiz/quiz/${id}`, {
        //         method: "PUT",
        //         headers: {
        //             Authorization: `JWT ${this.token}`
        //         },
        //         body: JSON.stringify()
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data)
        //         })
        //     })
        // }, 
        // deleteQuiz: function(){
        //     const URL = this.prodURL ? this.prodURL : this.devURL
        //     const id = event.target.id 
        //     fetch(`${URL}/quiz/quiz/${id}`,{
        //         method: "DELETE", 
        //         headers: {
        //             Authorization: `JWT ${this.token}`
        //         },
        //         body: JSON.stringify()

        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data)
        //         })
        //     })
        // }
    }
})

const URL = "https://localhost:8000"

