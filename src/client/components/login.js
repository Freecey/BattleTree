import React from "react";
import axios from "axios";
import {Formik, Field, Form} from "formik";
const sleep = ms => new Promise(r => setTimeout(r, ms));
const Login = () => (
    <div>
        <h1>{"Loggin"}</h1>
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={async values => {
                await sleep(500);
                axios
                    .post("/user/login", values)
                    .then(res => {
                        // Store Data in sessionStorage
                        sessionStorage.setItem("token", res.data.token);
                        console.log(res.data);
                        axios
                            .get("/user/me", {headers: {token: res.data.token}})
                            .then(response => {
                                sessionStorage.setItem(
                                    "_id",
                                    response.data._id,
                                );
                                sessionStorage.setItem(
                                    "username",
                                    response.data.username,
                                );
                                sessionStorage.setItem(
                                    "email",
                                    response.data.email,
                                );
                                console.log(response.data);
                                window.location.reload(false);
                            })
                            .catch(error => {
                                console.log(`error ${error}`);
                            });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }}>
            {({isSubmitting}) => (
                <Form>
                    <label htmlFor={"email"}>{"Enter your mail"}</label>
                    <Field name={"email"} placeholder={"Jane@gmail.com"} />

                    <label htmlFor={"password"}>{"Password"}</label>
                    <Field name={"password"} placeholder={"*****"} />
                    <button type={"submit"} disabled={isSubmitting}>
                        {"Submit"}
                    </button>
                </Form>
            )}
        </Formik>
    </div>
);
export {Login};
