## React Client Application Routes

- Route `/`: single page application main page

## API Server

- POST `/api/login`
  - request 
    - parameters: username, password
  - response
    - body: success -> bool, (if successful) user -> str
- POST `/api/logout`
  - must have user in request headers (sets on login by cookie-session)
- GET `/api/courses`
  - response 
    - list of courses
    - course = {code, name, credits, capacity, preparatory, incompatibles, enrollment}
- GET `/api/plan`
  - must have user in request headers (sets on login by cookie-session)
  - response
    - success -> bool, plan -> {id, courses, type, total, max}

- POST `/api/plan`
  - must have user in request headers (sets on login by cookie-session)
  - response
    - success -> bool

- DELETE `/api/plan`
  - must have user in request headers (sets on login by cookie-session)
  - response
    - success -> bool

- PUT `/api/plan`
  - must have user in request headers (sets on login by cookie-session)
  - request
    - plan -> {courses}
  - response
    - success -> bool

## Database Tables

- Table `users` - contains id username hased_password salt plan_id
- Table `courses` - contains code name credits max_students preparatory
- Table `incompatibles` - contains course1 course2
- Table `plan_courses` - contains plan_id course_id
- Table `plans` - contains id type user_id

## Main React Components

- `Course` (in `Course.js`): representing each course of system, can be added to study plan if a user logged in
- `PlanCourse` (in `Course.js`): representing each course of study plan, can be removed from study plan
- `Courses` (in `Courses.js`): list group of Course
- `PlanCourses` (in `Courses.js`): list group of PlanCourse
- `Login` (in `Login.js`): login form to authenticate users
- `ErrorPopUp` (in `Modal.js`): modal (pop-up) for showing some errors (for example login failure)
- `Plan` (in `Plan.js`): representing user study plan. can be deleted, saved or canceled by user
- `CreatePlan` (in `Plan.js`): representing a form allowing user to create a new study plan

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- student1, pass1
- student2, pass2
- student3, pass3
- student4, pass4
- student5, pass5
