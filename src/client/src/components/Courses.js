import React from "react";
import { Course, PlanCourse } from './Course';
import { Alert, Button, Col, Container, ListGroup, Row } from 'react-bootstrap';

/* components representing list of courses 
    Courses: list of system courses
    PlanCourses: list of study plan courses
*/
export function Courses(props) {
  let c = props.logged_in ? "list-small" : ""
  if (!props.courses) {
    return <div>Loading...</div>;
  } else {
    return (
      <Container>
        <h2>Courses</h2>
        <ListGroup className={c}>
          {props.courses.map(course => (
            <ListGroup.Item key={course.code}>
              <Course course={course} />
              {props.logged_in && <Add onAdd={props.onAdd} course={course} />}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    );
  }
}

function Add(props) {
  let course = props.course
  if (course.valid)
    return (
      <Row>
        <Col><Button onClick={() => props.onAdd(course)}>Add</Button></Col>
      </Row>
    )
  return (
    <Row md="auto">
      <Col><Button onClick={() => props.onAdd(course)} disabled>Add</Button></Col>
      <Col><Alert variant="danger">{course.constraint}</Alert></Col>
    </Row>
  )
}

export function PlanCourses(props) {
  let credits = 0;
  for (let i = 0; i < props.courses.length; i++)
    credits += props.courses[i].credits
  return (
    <Container>
      <Row><h4>Courses</h4></Row>
      <Row><div>credits: {credits}</div></Row>
      <ListGroup className="list-small">
        {props.courses.map(course => (
          <ListGroup.Item key={course.code}>
            <PlanCourse course={course} onRemove={() => props.onRemove(course)} />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}


