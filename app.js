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
        quizDirection: "",
        updateQuizName: "",
        updateQuizDirections: "",
        questions: [],
        currentQuiz: [],
        modifyQuestions: false,
        onDashboard: false,
        onTakeQuiz: false,
        QuizID: 0,
        questionOrder: 0,
        quizQuestion: "",
        quizChoiceOne: "",
        quizChoiceTwo: "",
        quizChoiceThree: "",
        quizChoiceFour: "", 
        updatedQuizQuestion: "",
        updatedQuizChoiceOne: "",
        updatedQuizChoiceTwo: "",
        updatedQuizChoiceThree: "",
        updatedQuizChoiceFour: "",
        updatedQuizID: 0,
        updatedQuestionOrder: 0
    }, 
    // computed: { 
    //     q: function(){
    //         if(this.quizzes.results){
    //         return this.quizzes.results.map((quiz,index) => {
    //             return {
    //                 quiz: this.quizzes.results[index],
    //                 questions: this.questions.results[index]
    //             }
    //         }) } else {
    //            return []
    //         }
    //     }
    // },
    methods: {
        takeQuizPage: function(){
            this.modifyQuestions = false
            this.onDashboard = false 
            this.onTakeQuiz = true
        },
        backToDashboard: function(){
            this.onDashboard = true 
            this.modifyQuestions = false
            this.onTakeQuiz = false
        },
        onModifyQuestions: function(){
            this.modifyQuestions = true
            this.onDashboard = false
            this.onTakeQuiz = false 
            this.getQuestions()
            
        },
        chooseQuiz: function(event){
            const id = event.target.id 
            this.currentQuiz = this.questions.results[id]

            // fetch(`${URL}/quiz/questions/{id}/`, {
            //     method: "GET",
            //     headers:{
            //         Authorization: `JWT ${this.token}`
            //     },
            //     body: JSON.stringify()
            // })
            // .then(response => response.json())
            // .then(data => {

            //     console.log(data)
            //     // this.q = data
                
            // })
        },

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
                this.dashboard = true
                this.getQuizzes()
                this.getQuestions()



            
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

                console.log(data)
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
                alert("New Quiz Has Been Created")
            })
        }, 
        editQuiz: function(event){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const id = event.target.id 
            const updated = {
                name: this.updateQuizName,
                directions: this.updateQuizDirections,
            }

            fetch(`${URL}/quiz/quiz/${id}/`, {
                method: "PUT",
                headers: {
                    Authorization: `JWT ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updated)
            })
            .then(response => {
                this.updateQuizName = ""
                this.updateQuizDirections = ""
                this.getQuizzes() 
                alert("Quiz Has Been Updated")
            })
        }, 
        deleteQuiz: function(event){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const id = event.target.id 

            fetch(`${URL}/quiz/quiz/${id}`,{
                method: "DELETE", 
                headers: {
                    Authorization: `JWT ${this.token}`
                },
            })
            .then(response =>{
            
                this.getQuizzes()

            })
        }, 
        getQuestions: function(){
            const URL = this.prodURL ? this.prodURL : this.devURL

        fetch(`${URL}/quiz/questions/`, {
                method: "GET",
                headers:{
                    Authorization: `JWT ${this.token}`
                },
                body: JSON.stringify()
            })
            .then(response => response.json())
            .then(data => {

                console.log(data)
                this.questions = data
            })
        },
        createQuestion: function(){
            const URL = this.prodURL ? this.prodURL : this.devURL

            const question = { 
                quiz: this.QuizID,
                order: this.questionOrder,
                question: this.quizQuestion,
                choice_one: this.quizChoiceOne,
                choice_two: this.quizChoiceTwo,
                choice_three: this.quizChoiceThree,
                choice_four: this.quizChoiceFour
            }

            fetch(`${URL}/quiz/questions/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `JWT ${this.token}`
                }, 
                body: JSON.stringify(question)
            })
            .then(response => {
                this.QuizID = 0,
                this.questionOrder = 0,
                this.quizQuestion = "",
                this.quizChoiceOne = "",
                this.quizChoiceTwo = "",
                this.quizChoiceThree = "",
                this.quizChoiceFour = ""
                this.getQuestions()
                alert("New Question Has Been Created")
            })
        }, 
        editQuestion: function(event){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const id = event.target.id 
            const updated = { 
                quiz: this.updatedQuizID,
                order: this.updatedquestionOrder, 
                question: this.updatedQuizQuestion,
                ChoiceOne: this.updatedQuizChoiceOne,
                ChoiceTwo: this.updatedQuizChoiceTwo,
                ChoiceThree: this.updatedQuizChoiceThree,
                ChoiceFour: this.updatedQuizChoiceFour
            }

            fetch(`${URL}/quiz/questions/${id}/`, {
                method: "PUT",
                headers: {
                    Authorization: `JWT ${this.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updated)
            })
            .then(response => {
                this.updatedQuizQuestion,
                this.updatedQuizChoiceOne,
                this.updatedQuizChoiceTwo,
                this.updatedQuizChoiceThree,
                this.updatedQuizChoiceFour
                this.getQuestions() 
                alert("Quiz Has Been Updated")
            })
        }, 
        deleteQuestion: function(event){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const id = event.target.id 

            fetch(`${URL}/quiz/questions/${id}`,{
                method: "DELETE", 
                headers: {
                    Authorization: `JWT ${this.token}`
                }
            })
            .then(response =>{
            
                this.getQuestions()

            })
        }
    }
})

