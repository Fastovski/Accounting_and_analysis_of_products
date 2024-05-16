import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Authorization.css'

export const Authorization=()=>{
    let navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required("Это поле обязательно для ввода"),
        email: Yup.string().email("Неверный формат почты").required("Это поле обязательно для ввода"),
        password: Yup.string().required("Это поле обязательно для ввода")
    });

    const onSubmit = async(values, {setErrors}) => {
        try{
            const response = await axios.post("http://localhost:8081/auth", values);
            if (response.data.id != null){
                if(response.data.role === "User") {
                    localStorage.setItem("id", JSON.stringify(response.data.id));
                    navigate("/user");
                }
                if (response.data.role === "Employee"){
                    localStorage.setItem("id", JSON.stringify(response.data.id));
                    navigate("/employee");
                }
                if (response.data.role === "Admin"){
                    localStorage.setItem("id", JSON.stringify(response.id));
                    navigate("/admin")
                }
            }else {
                setErrors("password", "Неверный логин или пароль");
            }

        }
        catch(error) {console.log(error);}

    };

    return(
        <div className="authorization-background">
            <div className='form-background'>
            <Formik initialValues={{ name: '', email: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="authorization-form">
                        <div className="form-group name-group">
                          <label htmlFor="name">Имя</label>
                          <Field name="name" type="text" className="form-control name-field" />
                          <ErrorMessage name="name" component="div" style={{ color: "red", height: 30 }} />
                        </div>
                        <div className="form-group email-group">
                          <label htmlFor="email">Email</label>
                          <Field name="email" type="email" className="form-control email-field" />
                          <ErrorMessage name="email" component="div" style={{ color: "red", height: 30 }} />
                        </div>
                        <div className="form-group password-group">
                          <label htmlFor="password">Пароль</label>
                          <Field name="password" type="password" className="form-control password-field" />
                          <ErrorMessage name="password" component="div" style={{ color: "red", height: 30 }} />
                        </div>
                        <div className="submit-button">
                            <button type="submit" className="btn btn-primary w-25">Войти</button>
                        </div>
                </Form>
            </Formik>
            </div>
        </div>
    );   

}