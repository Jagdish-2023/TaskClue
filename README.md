# Taskclue

A task management app where users can create projects, assign tasks to teams, set deadlines, and organize work using tags.

## Live demo
[Run](https://taskclue.vercel.app)

---

## Login
> **Guest** <br>
> email: `john@gmail.com` <br>
> password: `John@123`

## Quick Start
```
git clone https://github.com/Jagdish-2023/TaskClue.git
cd TaskClue
npm install
npm run dev
```

## Technologies
- React, react-router, reduxjs/toolkit
- Bootstrap
- MongoDB,Mongoose
- Node.js, Express.js
- JWT (JSON Web Token)

## Features
**Dashboard**
- Sidebar navigation (Projects, Teams, Reports).
- A list of ongoing projects.
- Options to add new Task & Project via buttons.

**Projects**
- A project-specific view with tasks listed under the project.
- Displays all Tasks inside a Table including task details (status, owner, due date).
- Sorting and Filtering options to easily manage the Tasks.
- Option to add a new Task for a Project using a button.

**Teams**
- Allows managing and displaying the list of existing teams.
- Specific Team view showing all the Team members.
- Option to create new Team using a button.

**Task Management**
- Displays full Task details with project, team, owner, tags, due date, and status.
- Option to mark the task as complete..

**Reports**
- Various reports showing task completion metrics, pending work,and task statistics.

**Authentication**
- JWT based authentication.
- SignUp and SignIn feature to easily access to the account.

## API Reference
**Projects**
- GET/projects - Get all Projects.
- POST/projects - Create a new Project.

**Teams**
- GET/teams - Get all Teams (name and description).
- GET/teams/:teamId - Get a specific Team details.
- POST/teams - Add a new Team.

**Tasks**
- GET/tasks - Get all Taks.
- GET/tasks/:taskId - Get a specific Task's details.
- POST/tasks - Add a new Task asscociated to a Project.
- POST/tasks/:taskId - Update Task details (e.g. status).

**Tags**
- GET/tags - Get all tags name.

**Reports**
- GET/report/last-week - Get the data of total no. of Tasks done of last week.
- GET/report/closed-tasks - Get the data of total no. of Tasks completed by Team.
- GET/report/pending - Get the data of total no. of pending Tasks.

**Authentication**
- POST/register - Register a new user account.
- POST/login - Sign in an existing user with credentials.

---
## Contact
For bugs or feature requests, please reach out to jagdishjpradhan@gmail.com 
