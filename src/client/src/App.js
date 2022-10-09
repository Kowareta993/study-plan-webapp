import './App.css';
import { Courses } from './components/Courses'
import { Container, Stack } from 'react-bootstrap'
import { Login } from './components/Login';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CreatePlan, Plan } from './components/Plan';
import { ErrorPopUp } from './components/Modal';

var API = require('./api')
/* main app component consists of study plan, login form and courses list */
function App() {
  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState(null);
  const [fetchPlan, setFetchPlan] = useState(false)
  const [courses, setCourses] = useState()
  const [showErr, setShowErr] = useState(false)
  const [error, setError] = useState("")
  const [planChanged, setPlanChanged] = useState(false)

  function onLogin(username, password) {
    API.login(username, password, (u) => {
      if (!u) {
        setError("login failed!")
        setShowErr(true)
        setUser(null)
      }
      else
        setUser(u)
    })
  }

  function createPlan(option) {
    API.createPlan(option, fetchPlan, setFetchPlan)
  }

  function addCourse(course) {
    setPlanChanged(true)
    setPlan({ ...plan, courses: plan.courses.concat(course) })
  }

  function removeCourse(course) {
    let idx;
    for (let i = 0; i < plan.courses.length; i++) {
      if (plan.courses[i].preparatory == course.code) {
        setShowErr(true)
        setError(`cannot remove, ${plan.courses[i].code} depends on this`)
        return
      }
      if (plan.courses[i].code == course.code) {
        idx = i
      }
    }
    let c = plan.courses
    c.splice(idx, 1)
    setPlan({ ...plan, courses: c })
    setPlanChanged(true)
  }

  function cancelPlan() {
    API.logout(() => {
      setUser(null)
      setPlan(null)
      setPlanChanged(false)
    })

  }

  function deletePlan() {
    API.deletePlan(setPlan, () => { API.logout(setUser) })
    setPlanChanged(false)
  }

  function savePlan() {
    API.savePlan(plan, setPlan, () => { API.logout(setUser) })
    setPlanChanged(false)

  }

  function checkConstraints(plan, course) {
    if (!plan)
      return {
        ...course,
        valid: false,
        constraint: "no plan to add"
      }
    if (course.enrollment == course.capacity)
      return {
        ...course,
        valid: false,
        constraint: "class is full"
      }
    for (let i = 0; i < plan.courses.length; i++) {
      if (plan.courses[i].code == course.code)
        return {
          ...course,
          valid: false,
          constraint: "already in plan"
        }
      if (course.incompatibles.indexOf(plan.courses[i].code) >= 0)
        return {
          ...course,
          valid: false,
          constraint: `incompatible with ${plan.courses[i].code}`
        }
    }
    let codes = plan.courses.map((c) => { return c.code })
    if (course.preparatory != null && codes.indexOf(course.preparatory) < 0)
      return {
        ...course,
        valid: false,
        constraint: "preparatory is not in plan"
      }
    let credits = 0
    plan.courses.forEach((c) => { credits += c.credits })
    if (credits + course.credits > plan.max)
      return {
        ...course,
        valid: false,
        constraint: "credits exceed the limit"
      }
    return {
      ...course,
      valid: true,
      constraint: ""
    }
  }

  useEffect(() => {
    if (user)
      setCourses(courses.map((course) => checkConstraints(plan, course)))
  }, [plan])

  useEffect(() => {
    if (user)
      API.getPlan(setPlan)
  }, [user, fetchPlan])

  useEffect(() => {
    API.getCourses(setCourses)
  }, [user])


  return (
    <Container>
      {!user && <Login onLogin={onLogin} />}
      {user && <h5>welcome {user}</h5>}
      {user && plan && <Plan plan={plan} onAdd={addCourse} onRemove={removeCourse} changed={planChanged} onCancel={cancelPlan} onDelete={deletePlan} onSave={savePlan} />}
      {user && !plan && <CreatePlan onCreate={createPlan} />}
      <ErrorPopUp show={showErr} onHide={() => setShowErr(false)} error={error} />
      <Courses courses={courses} logged_in={user != null} onAdd={addCourse} />
    </Container>
  );
}

export default App;
