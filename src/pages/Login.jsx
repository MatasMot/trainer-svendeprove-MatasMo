import { Formik, Field, Form, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup"

const Login = () => {

    const navigate = useNavigate();
    const schema = Yup.object().shape({
        username: Yup.string().min(5, "Username must be 5 characters long!").required("Username is required!"),
        password: Yup.string().min(4, "Password must be 4 characters long!").required("Password is required!")
    })

{/* initialValues is a prop
    fetch returns an object that we call as res. Res has properties like .ok and methods like .json()*/}
    return (
        <Formik
            initialValues={{
                "username": "",
                "password": ""
            }}
            validationSchema={schema}
            onSubmit = {async (values, { setStatus, setSubmitting }) => {
                fetch("http://localhost:4000/auth/token", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values),
                })
                .then(res => {
                    console.log(res);
                    if (!res.ok) {
                        return res.json().then(errorData => {
                            setStatus(errorData)
                            setSubmitting(false)
                        })
                    }
                    else {
                        return res.json()
                    }
                    })
                .then(data => {
                    console.log(data);
                    Cookies.set("token", data.accessToken);
                    Cookies.set("userId", data.id);
                    
                    navigate("/");
                })
                console.log(values)
            }}
        >
            {({status}) => (
                <Form>
                    <h1>LOGIN PAGE</h1>
                    <div className="flex gap-4">
                        <label htmlFor="username">Username:</label>
                        <Field id="username" name="username" type="text" />
                        <ErrorMessage name="username" component="div" className="text-red-500"/>
                    </div>
                    <div className="flex gap-4">
                        <label htmlFor="password">Password:</label>
                        <Field id="password" name="password" type="password" />
                        <ErrorMessage name="password" component="div" className="text-red-500"/>
                    </div>
                    {/*error from API*/}
                    {status && <p className="text-red-500">{status}</p>}
                    <button type="submit">Log In!</button>
                    <div><Link to="/register">Not yet a member? Register here</Link></div>
                </Form>
            )}
        </Formik>
    );
};

export default Login;