import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import './aboutUs.css'

export const AboutUsUpdate = () => {
    
    const [company, setCompany] = useState({});

    const {id} = useParams();

    const {aboutUs, certificate, mail, phoneNumber} = company;

    const loadCompany = useCallback(async () => {
        await axios.get(`http://localhost:8081/company/all`).then((response)=>{
            setCompany(response.data);
        });
    },[id]);

    useEffect(() => {
        loadCompany();
    }, [loadCompany])

    let navigate = useNavigate();

    const validationSchema = Yup.object({
        aboutUs: Yup.string().required('Поле обязательно к заполнению'),
        certificate: Yup.string().required('Поле обязательно к заполнению'),
        mail: Yup.string().email('Должно быть exmple@gmail.com').required('Поле обязательно к заполнению'),
        phoneNumber: Yup.string().required('Поле обязательно к заполнению')
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        console.log(values);
        await axios.put(`http://localhost:8081/company/update/1`, values)
            .then(()=>{
                navigate("/admin");
            })
            
        setSubmitting(false);
    }

    return (
        <div  className='back-color'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card p-3 mb-2 p-3 mb-2 bg-info text-dark shadow">
                <div className="card-header">Обновление компании</div>
                <div className="card-body">
                  <Formik
                    initialValues={{ aboutUs: aboutUs, certificate: certificate, mail: mail, phoneNumber: phoneNumber }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                  >
                    {({ isSubmitting }) => (
                      <Form>
                        <div className="form-group">
                          <label htmlFor="aboutUs">About Us</label>
                          <Field as="textarea" name="aboutUs" className="form-control" id="aboutUs" placeholder="About Us" />
                          <ErrorMessage name="aboutUs" component="div" style={{ color: "red", height: 30 }} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="certificate">Certificate</label>
                          <Field type="text" name="certificate" className="form-control" id="certificate" placeholder="Certificate" />
                          <ErrorMessage name="certificate" component="div" style={{ color: "red", height: 30 }} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="mail">Mail</label>
                          <Field type="text" name="mail" className="form-control" id="mail" placeholder="Mail" />
                          <ErrorMessage name="mail" component="div" style={{ color: "red", height: 30 }} />
                        </div>
                        <div className="form-group">
                          <label htmlFor="phoneNumber">Phone Number</label>
                          <Field type="text" name="phoneNumber" className="form-control" id="phoneNumber" placeholder="Phone Number" />
                          <ErrorMessage name="phoneNumber" component="div" style={{ color: "red", height: 30 }} />
                        </div>
                        <button type="submit" className="btn btn-primary w-50" disabled={isSubmitting}>Обновить</button>
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
    )
}