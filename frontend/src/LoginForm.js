import React, {useState} from "react";
import { Formik, Form } from "formik";
import {login} from "./UserAPI"
import * as yup from "yup";
import PropTypes from 'prop-types'

import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import Button from "./Button";

async function loginUser(credentials) {
    return fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }


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

export default function LoginForm({setToken}) {

//     const [username, setUserName] = useState();
//   const [password, setPassword] = useState();

  const handleSubmit = async (values) => {
    e.preventDefault();
    const token = await loginUser({
     // email,
      //password
      values
    });
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
                        onSubmit={(e, values) => {
                          //  const result = await login(values);
                           // console.log(result); 
                            handleSubmit(values)
                        }}
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
    LoginForm.propTypes = {
        setToken: PropTypes.func.isRequired }
}

