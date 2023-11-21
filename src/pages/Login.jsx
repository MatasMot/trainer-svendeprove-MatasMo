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
                    Cookies.set("token", data.token, { sameSite: 'lax' }, { httpOnly: false});
                    Cookies.set("userId", data.userId, { sameSite: 'lax' }, { httpOnly: false});
                    
                    navigate("/");
                })
                console.log(values)
            }}
        >
            {({status}) => (
                <Form className="fixed left-0 top-[6rem]">

                    <h1 className="text-[#F1C40E] font-bold text-[56px] ml-12">Believe Yourself</h1>

                    <div className="flex items-center gap-4">
                        <div className="bg-[#000000] w-8 h-1 "></div>
                        <p className="font-bold text-[20px]">Train like a pro</p>
                    </div>

                    <div className="mt-16">
                        <p className="text-[18px] font-semibold mx-4 mb-4">Log in with your credentials</p>
                        <Field className="rounded-full border-2 py-[15px] px-[75px] mx-4" id="username" name="username" type="text" placeholder="Enter your username..."/>
                        <ErrorMessage name="username" component="div" className="text-red-500"/>
                    </div>

                    <div>
                        <Field className="rounded-full border-2 py-[15px] px-[75px] mx-4 mt-4" id="password" name="password" type="password" placeholder="Enter your password..."/>
                        <ErrorMessage name="password" component="div" className="text-red-500"/>
                    </div>

                    {/*error from API*/}
                    {status && <p className="font-bold text-red-500">{status}</p>}

                    <button className="color-black bg-[#F1C40E] rounded-full py-[15px] px-[144px] mx-4 mt-4 font-semibold " type="submit">LOG IN</button>

                    {/*<div><Link to="/register">Not yet a member? Register here</Link></div>*/}
                </Form>
            )}
        </Formik>
    );
};

export default Login;