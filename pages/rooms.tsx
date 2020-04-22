import Router from "next/router";
import Container from "react-bootstrap/Container";

const {useState} = require("react");

export default function ShareThought() {
    const [message, setMessage] = useState("");

    async function submit(event) {
        event.preventDefault();

    }

    return (
        <Container>

        </Container>
    );
}
