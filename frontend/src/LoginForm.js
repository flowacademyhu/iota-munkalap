import React from "react";
import { Formik, Form } from "formik";
import {login} from "./UserAPI"
import * as yup from "yup";

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
        .min(5, "A jelszó legalább 5 karakter legyen!")
});

const username = "user12345";
const password = "user12345";

//mock.onPost("http://localhost:8080/api/users/login", { username: 'user12345', password: 'user12345' }).reply(204, { accessToken: '...' });

export default function LoginForm() {
    return (
        <div className="container background">
            <div className="row">
                <div className="col-12">
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        validationSchema={schema}
                        onSubmit={async values => {
                            const result = await login(username, password);
                            console.log(result); 
                        }}
                    >
                        <Form>
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

