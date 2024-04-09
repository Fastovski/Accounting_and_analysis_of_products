import React, {useState, useEffect, useCallback} from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, Link, useParams } from 'react-router-dom';
import axios from 'axios';

export const UpdateEmployee = () => {
    let navigate = useNavigate();

    const[user, setUser] = useState();
    const {id} = useParams();
    const {name, email} = user;

    const loadEmployee = useCallback(async() => {
        await axios.get(`http://localhost:8081/employee/one/${id}`).then((response)=>{
            setUser(response.data);
        });
    },[id]);

    useEffect(() =>{
        loadEmployee();
    },[loadEmployee])

    const validationSchema = Yup.object({
        name: Yup.string().required('Поле обязательно к заполнению'),
        email: Yup.string().email('Должно быть exmple@gmail.com').required('Поле обязательно к заполнению')
    });

    const onSubmit = async (values, {setSubmitting, setErrors}) => {
        await axios.put (`http://localhost:8081/employee/one/${id}`, values).then(()=>{
            navigate("/admin");
        })
        .catch(function(error){
            setErrors({email:"Такой работник уже есть"});
        });
        setSubmitting(false);
    }

    return(
        <div className="container">
            <div className="card-header">Обновление пользователя</div>
                <div className="card-body">
                  <Formik
                    initialValues={{ name: name, email: email }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <Field type="text" name="name" className="form-control" id="name" placeholder="Name" />
                          <ErrorMessage name="name" component="div" style={{ color: "red", height: 30 }} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <Field type="text" name="email" className="form-control" id="email" placeholder="Email" />
                          <ErrorMessage name="email" component="div" style={{ color: "red", height: 30 }} />
                        </div>
                        <button type="submit" className="btn btn-primary w-50" disabled={isSubmitting}>Обновить</button>
                      </Form>
                      
                    )}
                  </Formik>
                </div>
                <Link className="btn btn-danger w-50 my-2" to={"/admin"}>Назад</Link>
        </div>
    )
}