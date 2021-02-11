import React from 'react';
import { Form, Col, Button } from "react-bootstrap"; 

export default function FilterEmployees() {
    return (
<Form>
  <Form.Row className="align-items-center">
    <Col xs="auto" className="my-1">
      <Form.Label className="mr-sm-2" htmlFor="inlineFormCustomSelect" srOnly>
        Preference
      </Form.Label>
      <Form.Control
        as="select"
        className="mr-sm-2"
        id="inlineFormCustomSelect"
        custom
      >
        <option value="Active">Aktív</option>
        <option value="NonActive">Nem aktív</option>
        <option value="All">Mind</option>
      </Form.Control>
    </Col>
    <Col xs="auto" className="my-1">
      <Button type="submit">Submit</Button>
    </Col>
  </Form.Row>
</Form>
    );
}