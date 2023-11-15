import { Formik, Field, Form, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import * as Yup from "yup"

const Register = () => {

    const navigate = useNavigate();
    const schema = Yup.object().shape({
        name: Yup.string().min(2, "Name must be more then 2 characters!").required("Name is required!"),
        email: Yup.string().email("Please type a valid email!").required("Email is required!"),
        password: Yup.string().min(6, "Password must be 6 characters long!").required("Password is required!"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password")], "Passwords must match!").required("Please confirm your password!")
    })

    return (
        <Formik
            initialValues={{
                "name" : "",
                "email": "",
                "password": "",
                "confirmPassword": ""
            }}
            validationSchema={schema}
            onSubmit = {async (values, { setStatus, setSubmitting }) => {
                fetch("http://localhost:4000/register", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        password: values.password
                    }),
                })
                .then(res => {
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
                    Cookies.set("userId", data.user.id);
                    
                    navigate("/");
                })
                console.log(values)
            }}
        >
            {({status}) => (
            <Form>
                <h1>Register</h1>
                <div className="flex gap-4">
                    <label htmlFor="name">Name:</label>
                    <Field id="name" name="name" type="text" />
                    <ErrorMessage name="name" component="div" className="text-red-500"/>
                </div>
                <div className="flex gap-4">
                    <label htmlFor="email">Email:</label>
                    <Field id="email" name="email" type="email" />
                    <ErrorMessage name="email" component="div" className="text-red-500"/>
                </div>
                <div className="flex gap-4">
                    <label htmlFor="password">Passoword:</label>
                    <Field id="password" name="password" type="password" />
                    <ErrorMessage name="password" component="div" className="text-red-500"/>
                </div>
                <div className="flex gap-4">
                    <label htmlFor="confirmPassword">Confirm Passoword:</label>
                    <Field id="confirmPassword" name="confirmPassword" type="password" />
                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500"/>
                </div>
                {/*error from API*/}
                {status && <p className="text-red-500">{status}</p>}
                <button type="submit">Register</button>
                <div><Link to="/login">Already registered? Log in here</Link></div>
            </Form>
            )}
        </Formik>
    );
};

export default Register;