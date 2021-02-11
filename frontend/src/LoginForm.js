import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import {loginUser} from './UserAPI'


import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import Button from "./Button";

const schema = yup.object().shape({
    email: yup
        .string()
        .required("E-mail megadása kötelező!")
        .email("Nem megfelelő email cím!"),
    password: yup
        .string()
        .required("A jelszó megadása kötelező!")
        .min(8, "A jelszó legalább 8 karakter legyen!")
});

export default function LoginForm({ setToken }) {

    const handleSubmit = async (values) => {
        const token = await loginUser(values);
        setToken(token);
    }

    return (
        <div className="container loginform">
            <div className="row">
                <div className="col-12">
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={schema}
                        onSubmit={handleSubmit}
                    >
                        <Form >
                            <h3 className="my-5 text-center">Bejelentkezés</h3>
                            <EmailInput label="Email cím" name="email" />
                            <PasswordInput label="Jelszó" name="password" />
                            <div className="my-5 d-flex justify-content-center">
                                <Button type="submit" text="Bejelentkezés" />
                            </div>


                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    );
    
}

