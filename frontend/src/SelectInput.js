import React from "react";
import Form from 'react-bootstrap/Form';

export default function SelectInput({handleChange, label, container, ...props }) {
    
    return (
        <div className='form-group my-4'>
            <Form>
                <Form.Group controlId="exampleForm.SelectCustom">
                    <Form.Label>{label}</Form.Label>
                    <Form.Control as="select" custom>
                        {container.map(oneItem => (
                            <option onChange={() => handleChange(oneItem.value)} key={oneItem.id} value={oneItem.value}> {oneItem.label} </option>
                        ))}
                    </Form.Control>
                </Form.Group>
            </Form>
        </div>
    )
}

