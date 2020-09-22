# Project Overview - Quiz App FRONTEND

## Project Schedule

APPLIES TO BACKEND AND FRONTEND 

|  Day | Deliverable | Status
|---|---| ---|
|Day 1 - Friday| Deploy to Netlify | Complete
|Day 2 - Sunday| Project Description | Complete
|Day 2 - Sunday| Wireframes / Priority Matrix / Timeline `backend` and `frontend`| Complete
|Day 3 - Monday| Work on Backend | Complete
|Day 6 - Thursday| Begin Frontend | Complete
|Day 6 - Thursday| Core Application Structure (HTML, CSS, etc.) | Complete
|Day 6 - Thursday| Create Frontend Login | Complete
|Day 6 - Thursday| Start Mobile Responsive Design | Complete
|Day 7 - Friday| Start Tablet & Desktop Responsive Design | Complete
|Day 8 - Saturday| Continue to Debug Frontend | Complete
|Day 9 - Sunday| Complete MVP | Complete
|Day 11 - Tuesday| Present | Incomplete


## Project Description

This project will be a quiz web application, where a user is able to login and modify and add quizzes. As of Sunday 9/13, the application has a login, question and answer feature. 

## Time/Priority Matrix 

[Time Priority Matrix](https://res.cloudinary.com/stephaniev/image/upload/v1600048377/Screen_Shot_2020-09-13_at_9.52.27_PM_kqxlbx.png)

## Wireframes 
- Desktop [Wireframes](https://res.cloudinary.com/stephaniev/image/upload/v1600047183/Screen_Shot_2020-09-13_at_9.32.37_PM_ocetpf.png) 
- Mobile [Wireframes](https://res.cloudinary.com/stephaniev/image/upload/v1600047480/Screen_Shot_2020-09-13_at_9.37.22_PM_dwg0qv.png) 
- Tablet [Wireframes](https://res.cloudinary.com/stephaniev/image/upload/v1600047795/Screen_Shot_2020-09-13_at_9.42.56_PM_s7a7v5.png) 

#### MVP

- Deploy on Netlify
- Frontend Login Dashboard (HTML/CSS/JS)
- JSON Data (JS)
- Questions (HTML/CSS/JS)
- Answers(HTML/CSS/JS)



#### PostMVP 

- Timed Feature 


#### MVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Frontend Login Dashboard | H | 5hr | 2hr | 2hr|
| Create User Profile Frontend | H | 2hr | 1hr | 1hr|
| Question  | H | 3hr | 12hr | 12hr|
| Answer/ Answers | H | 5hr | 12hr | 12hr|
| Debugging Frontend | H | 5hr | 20hr | 20hr|
| Total | H | 20hrs| -hrs | 51hrs |

#### PostMVP
| Component | Priority | Estimated Time | Time Invetsted | Actual Time |
| --- | :---: |  :---: | :---: | :---: |
| Timed Feature| L | 5hr | -hr | -hr|
| Total | H | 5hrs| -hrs | -hrs |

## Additional Libraries
- [TBA]() 
- [TBA]()
 

## Code Snippet

TBD

Use this section to include a brief code snippet of functionality that you are proud of an a brief description  

```
 editQuestion: function(event){
            const URL = this.prodURL ? this.prodURL : this.devURL
            const id = event.target.id 
            const updated = { 
                quiz: this.updatedQuizID,
                order: this.updatedquestionOrder, 
                question: this.updatedQuizQuestion,
                choice_one: this.updatedQuizChoiceOne,
                choice_two: this.updatedQuizChoiceTwo,
                choice_three: this.updatedQuizChoiceThree,
                choice_four: this.updatedQuizChoiceFour
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
                this.updatedQuizID,
                this.updatedQuestionOrder,
                this.updatedQuizQuestion,
                this.updatedQuizChoiceOne,
                this.updatedQuizChoiceTwo,
                this.updatedQuizChoiceThree,
                this.updatedQuizChoiceFour
                this.getQuestions() 
                alert("Quiz Has Been Updated")
            })
        }, 
```

## Issues and Resolutions

TBD
 Use this section to list of all major issues encountered and their resolution.