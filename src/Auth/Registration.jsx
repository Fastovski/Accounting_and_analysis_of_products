import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
        <Formik initialValues={{ name: '', email: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
                <div>
                    <label htmlFor="name">Имя</label>
                    <Field name="name" type="text" />
                    <ErrorMessage name="name" component="div" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <Field name="email" type="email" />
                    <ErrorMessage name="email" component="div" />
                </div>
                <div>
                    <label htmlFor="password">Пароль</label>
                    <Field name="password" type="password" />
                    <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit">Отправить</button>
            </Form>
        </Formik>
    );
} 