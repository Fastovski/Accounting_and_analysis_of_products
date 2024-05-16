import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registration.css';

export const Registration=()=>{
    let navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required('Это поле обязательно для ввода'),
        email: Yup.string().email('Неверный формат почты').required('Это поле обязательно для ввода'),
        password: Yup.string().required('Это поле обязательно для ввода')
    });

    const onSubmit = async (values, {setSubmitting, setErrors}) => {
        try{ 
            const result = await axios.post("http://localhost:8081/reg", values);
            localStorage.setItem("id", JSON.stringify(result.data.id));
            navigate("/user");
        }
        catch(error){
            if(error.response){
                setErrors({email:"Такой пользователь уже существует"});
            }
        }
        setSubmitting(false);
    }

    return(
        <div className="registration-background">
            <div className='form-background'>
            <Formik initialValues={{ name: '', email: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form className="registration-form">
                    <div className="name-div">
                        <label htmlFor="name">Имя</label>
                        <Field name="name" type="text" className="name-field" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div className="email-div">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" className="email-field" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div className="password-div">
                        <label htmlFor="password">Пароль</label>
                        <Field name="password" type="password" className="password-field" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <div className="submit-button">
                        <button type="submit">Отправить</button>
                    </div>
                </Form>
            </Formik>
            </div>
        </div>
    );
} 