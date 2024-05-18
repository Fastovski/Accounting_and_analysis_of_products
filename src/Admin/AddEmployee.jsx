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

    return (
        <div className='back-color'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card p-3 mb-2 p-3 mb-2 bg-info text-dark shadow">
                            <div className="card-header">Добавление менеджера</div>
                            <div className="card-body">
                                <Formik initialValues={{ name: '', email: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="form-group">
                                                <label htmlFor="name">Имя</label>
                                                <Field name="name" type="text" className="form-control" id="name" />
                                                <ErrorMessage name="name" component="div" style={{ color: "red", height: 30 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="email">Email</label>
                                                <Field name="email" type="email" className="form-control" id="email" />
                                                <ErrorMessage name="email" component="div" style={{ color: "red", height: 30 }} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="password">Пароль</label>
                                                <Field name="password" type="password" className="form-control" id="password" />
                                                <ErrorMessage name="password" component="div" style={{ color: "red", height: 30 }} />
                                            </div>
                                            <button type="submit" className="btn btn-primary w-50" disabled={isSubmitting}>Отправить</button>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                            <Link className="btn btn-danger w-50 my-2" to={"/admin"}>Назад</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    
}