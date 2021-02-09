import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";

import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import Button from "./Button";

//import userApi from "./userApi";

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

export default function LoginForm({ onRegistered }) {
  //  const [error, setError] = useState();
    return (
        <Formik
            initialValues={{
                email: "",
                password: ""
            }}
            validationSchema={schema}
            onSubmit={async values => {
                console.log("Küldés:", values);
            }}
        >
            <Form>
                <h3 className="mb-5 text-center">Bejelentkezés</h3>
                <EmailInput label="Email cím" name="email" />
                <PasswordInput label="Jelszó" name="password" />
                <Button>Bejelentkezés</Button>                    

            </Form>
        </Formik>
    );
}

