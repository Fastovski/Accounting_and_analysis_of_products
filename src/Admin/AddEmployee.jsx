import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './AddEmployee.css'


export const AddEmployee = () => {
    let navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required('Это поле обязательно для ввода'),
        email: Yup.string().email('Неверный формат почты').required('Это поле обязательно для ввода'),
        password: Yup.string().required('Это поле обязательно для ввода')
    });

    const onSubmit = async ( values, {setSubmitting, setErrors}) => {
        try{
            const result = await axios.post("http://localhost:8081/employee/add", values);
            localStorage.setItem("id", JSON.stringify(result.data.id));
            navigate("/admin");
        }
        catch(error){
            if(error.response){
                setErrors({email:"Такой менеджер уже существует в системе"});
            }
        }
        setSubmitting(false);
    }

    return(
        <div className="add-employee-form">
            <div className='addempForm'>
            <Formik initialValues={{ name: '', email: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <div className="form-fieldName">
                        <label htmlFor="name">Имя</label>
                        <Field name="name" type="text" />
                        <ErrorMessage name="name" component="div" />
                    </div>
                    <div className="form-fieldMail">
                        <label htmlFor="email">Email</label>
                        <Field name="email" type="email" />
                        <ErrorMessage name="email" component="div" />
                    </div>
                    <div className="form-fieldPass">
                        <label htmlFor="password">Пароль</label>
                        <Field name="password" type="password" />
                        <ErrorMessage name="password" component="div" />
                    </div>
                    <button type="submit">Отправить</button>
                </Form>
            </Formik>
            <Link className="btn btn-danger w-50 my-2" to={"/admin"}>Назад</Link>
            </div>
        </div>
    );
}