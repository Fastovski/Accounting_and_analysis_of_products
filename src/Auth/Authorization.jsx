import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Authorization=()=>{
    let navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required("Это поле обязательно для ввода"),
        email: Yup.email("Неверный формат почты").required("Это поле обязательно для ввода"),
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
                if (response.data.role === "Manager"){
                    localStorage.setItem("id", JSON.stringify(response.data.id));
                    navigate("/manager");
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
                    <div className="form-group">
                      <label htmlFor="password">Пароль</label>
                      <Field name="password" type="password" className="form-control" />
                      <ErrorMessage name="password" component="div" style={{ color: "red", height: 30 }} />
                    </div>
                    <button type="submit" className="btn btn-primary w-25">Войти</button>
                  </Form>
        </Formik>
    );      

}