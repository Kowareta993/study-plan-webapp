import React, { useState } from "react";
import { Col, Row, Button, Container } from 'react-bootstrap';

/* components representing each course 
    PlanCourse: courses in plan
    Course: courses in main list
*/
export function PlanCourse(props) {
    return (
        <Row>
            <Col>{props.course.code}</Col>
            <Col>{props.course.name}</Col>
            <Col>{props.course.credits}</Col>
            <Col><Button onClick={() => props.onRemove()}>remove</Button></Col>
        </Row>
    )
}

export function Course(props) {
    let course = props.course;
    const [collapsed, setCollapsed] = useState(false)

    function toggle() {
        setCollapsed(!collapsed)
    }
    let enrollments;
    if (course.capacity == null) {
        enrollments = <Col md={2}> Enrollment: {course.enrollment} </Col>
    } else {
        enrollments = <Col md={2}> Enrollment: {course.enrollment} / {course.capacity} </Col>
    }
    let incompatibles = ""
    course.incompatibles.forEach(course => { incompatibles += course + " " })
    let extra =
        <Row>
            {course.incompatibles.length > 0 && <Row>
                <Col>
                    incompatibles: {incompatibles}
                </Col>
            </Row>}
            {course.preparatory != null && <Row>
                <Col>
                    preparatory: {course.preparatory}
                </Col>
            </Row>}
        </Row>
    let but;
    if (!collapsed) {
        but = <Button onClick={() => toggle()}>expand</Button>
    } else {
        but = <Button onClick={() => toggle()}>contract</Button>
    }

    return (
        <Container>
            <Row>
                <Col md={1}>#{course.code}</Col>
                <Col ><b>{course.name}</b></Col>
                <Col md={2}>Credits: {course.credits}</Col>
                {enrollments}
            </Row>
            {collapsed && extra}
            <Row>
                <Col md={{ span: 1, offset: 11 }}>
                    {but}
                </Col>
            </Row>

        </Container>
    )


}

