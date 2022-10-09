import axios from "axios";
import React, { useState } from "react";
import { Col, Row, Button, Form, Container, Modal } from 'react-bootstrap';
import { PlanCourses } from "./Courses";

/* components representing study plan
    Plan: study plan, consists of removable courses and (delete, cancel, save) actions
    CreatePlan: representing a form to create study plan for user
*/
export function Plan(props) {
    let plan = props.plan

    let credits = "40-80";
    if (plan.type === "half-time") {
        credits = "20-40";
    }
    return (
        <Container>
            <Row>
                <Col><h3>Study Plan</h3></Col>
            </Row>
            <Row>
                <Col>{plan.type} {credits} credits</Col>
            </Row>
            <PlanCourses courses={plan.courses} onRemove={(course) => props.onRemove(course)} />
            <Row md="auto">
                <Col><Button onClick={() => props.onCancel()}>Cancel</Button></Col>
                <Col><Button onClick={() => props.onDelete()}>Delete</Button></Col>
                {props.changed && <Col><Button onClick={() => props.onSave()}>Save</Button></Col>}
            </Row>
        </Container>
    )
}

export function CreatePlan(props) {
    const [option, setOption] = useState("full-time")
    return (
        <Container>
            <div>You have no study plans, create one to get started!</div>
            <Row>
                <Col><Form.Select onChange={(event) => { setOption(event.target.value) }}>
                    <option>full-time</option>
                    <option>half-time</option>
                </Form.Select></Col>
                <Col>
                    <Button onClick={() => { props.onCreate(option) }}>Create</Button>
                </Col>
            </Row>

        </Container>
    )
}

