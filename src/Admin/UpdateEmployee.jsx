import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export const UpdateEmployee=()=> {
    
    const [user, setUser] = useState({});

    const {id} = useParams();

    const {name, email} = user;

    const loadEmployee = useCallback(async () => {
        await axios.get(`http://localhost:8081/employee/one/${id}`).then((response)=>{
            setUser(response.data);
        });
    },[id]);

    useEffect(() => {
        loadEmployee();
    }, [loadEmployee])

    let navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required('Поле обязательно к заполнению'),
        email: Yup.string().email('Должно быть exmple@gmail.com').required('Поле обязательно к заполнению')
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        console.log(values);
        await axios.put(`http://localhost:8081/employee/update/${id}`, values)
            .then(()=>{
                navigate("/admin");
            })
            .catch(function (error) {
                if (error.response) {
                    setErrors({ email: "Такой работник уже есть" });
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
            });
        setSubmitting(false);
    }

    return (
      <div>
        <Formik initialValues={{ name: '', email: '', password: '' }} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
                    <div className="form-group">
                      <label htmlFor="name">Имя</label>
                      <Field name="name" type="text" className="form-control" />
                      <ErrorMessage name="name" component="div" style={{ color: "red", height: 30 }} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <Field name="email" type="email" className="form-control" />
                      <ErrorMessage name="email" component="div" style={{ color: "red", height: 30 }} />
                    </div>
                    <button type="submit" className="btn btn-primary w-25">Иззменить</button>
                  </Form>
        </Formik>

        <Link className="btn btn-danger w-50 my-2" to={"/admin"}>Назад</Link>
        </div>
    )
}
