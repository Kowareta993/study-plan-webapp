import { Button, Modal } from "react-bootstrap";

/* error pop-up component, used for showing various errors to user
*/

export function ErrorPopUp(props) {
    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            animation={false}

            // aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    Error
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    {props.error}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}