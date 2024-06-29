import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { Eye, EyeOff, Mail, SquareAsterisk, User } from 'lucide-react'
import { useDisclosure } from '@nextui-org/react'
import FormikInput from '../../formFeilds/FormikInput'
import FormikErrorMsg from '../../formFeilds/FormikErrorMsg'
import CustomButton from '../../Button/CustomButton'
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import { showToast } from '../../../services/toasts'
import Toast from '../../../services/toasts'
import config from '../../../services/config'
import { useNavigate } from 'react-router-dom'

const clientId = config.google.clientID

const SignupForm = () => {
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate();

    const clientId = config.google.clientID

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const onSubmit = (values, { resetForm }) => {
        const formatedValues = JSON.stringify(values).toLocaleLowerCase();
        fetch(`${config.API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: formatedValues,
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.success) {
              showToast("Registration successful!", "success");
              resetForm();
                setTimeout(() => {
                    window.location.href = "/"
                },1500)
            } else {
              showToast("Registration failed! Please try again.", "error");
              resetForm();
            }
          })
          .catch((err) => {
            console.error(err);
            showToast("An error occurred! Please try again.", "error");
          });
    }

    const handleGoogleLoginSuccess = () => {
        window.location.href = `http://localhost:5500/api/v1/auth/google/callback`
    }

    const handleGoogleLoginFailure = (error) => {
        console.error('Google Login Failed:', error)
        showToast('Google Login failed! Please try again.', 'error')
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Email is required'),
        password: Yup.string().required('Password is required'),
    })

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div>
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({ values, handleChange, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col items-center gap-2">
                                <div className="relative w-full">
                                    <FormikInput
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        value={values.name}
                                        onChange={handleChange}
                                        className="w-full pl-9 overflow-hidden"
                                    />
                                    <div className="absolute top-0 left-0 h-[37px] w-9 flex items-center justify-center rounded-lg">
                                        <User className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <FormikErrorMsg
                                        name="name"
                                        component="div"
                                    />
                                </div>
                                <div className="relative w-full">
                                    <FormikInput
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        placeholder="Email"
                                        className="w-full pl-9 overflow-hidden"
                                    />
                                    <div className="absolute top-0 left-0 h-[37px] w-9 flex items-center justify-center rounded-lg">
                                        <Mail className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <FormikErrorMsg
                                        name="email"
                                        component="div"
                                    />
                                </div>
                                <div className="relative w-full">
                                    <div className="absolute right-0 top-0 h-[37px] w-9 flex items-center justify-center rounded-lg">
                                        {showPassword ? (
                                            <Eye
                                                className="h-4 w-4 text-gray-500 cursor-pointer"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            />
                                        ) : (
                                            <EyeOff
                                                className="h-4 w-4 text-gray-500 cursor-pointer"
                                                onClick={
                                                    togglePasswordVisibility
                                                }
                                            />
                                        )}
                                    </div>
                                    <FormikInput
                                        type={`${
                                            showPassword ? 'text' : 'password'
                                        }`}
                                        name="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        placeholder="Password"
                                        className="w-full pl-9 overflow-hidden"
                                    />
                                    <div className="absolute top-0 left-0 h-[37px] w-9 flex items-center justify-center rounded-lg">
                                        <SquareAsterisk className="h-4 w-4 text-gray-500" />
                                    </div>
                                    <FormikErrorMsg
                                        name="password"
                                        component="div"
                                    />
                                </div>
                                <CustomButton
                                    className="bg-primary text-secondary"
                                    type="submit"
                                    label={'Sign Up'}
                                />
                            </div>
                        </form>
                    )}
                </Formik>
                <div className="flex items-center justify-center mt-4 mb-4 text-sm">
                    <hr className="w-1/3 border-gray-400" />
                    <span className="mx-2 text-gray-600">Or</span>
                    <hr className="w-1/3 border-gray-400" />
                </div>
                <div className="flex items-center justify-center">
                    <GoogleLogin
                        onSuccess={handleGoogleLoginSuccess}
                        onFailure={handleGoogleLoginFailure}
                        cookiePolicy={'single_host_origin'}
                    ></GoogleLogin>
                </div>
                <Toast />
            </div>
        </GoogleOAuthProvider>
    )
}

export default SignupForm
