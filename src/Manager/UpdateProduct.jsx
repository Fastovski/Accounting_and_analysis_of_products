import React, { useState, useEffect, useCallback } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import '../Client/menu.css'

export const UpdateProduct=()=> {

    const [product, setProduct] = useState({});

    const {id} = useParams();

    //const {name, location, costPerDay} = banquet;

    const loadProduct = useCallback(async () => {
        await axios.get(`http://localhost:8081/banquet/one/${id}`).then((response)=>{
            setProduct(response.data);
        });
    }, [id]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct])

    let navigate = useNavigate();

    const validationSchema = Yup.object({
        name: Yup.string().required('Поле обязательно к заполнению'),
        location: Yup.string().required('Поле обязательно к заполнению').min(3, 'Минмум 3 символа'),
        costPerDay: Yup.number().required('Поле обязательно к заполнению').min(0, 'Минимальное значение: 1')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        await axios.put(`http://localhost:8081/banquet/update/${id}`, values);
        navigate("/employee");
        setSubmitting(false);
    }

    return (
        <div className='menu'>
            <Formik initialValues={{name: '', category: '', cost: '', description:''}} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-6">
                                <div className="card p-3 mb-2 p-3 mb-2 bg-info text-dark shadow">
                                    <div className="card-header">Добавление</div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="name">Название товара</label>
                                            <Field name="name" type="text" className="form-control" id="name" />
                                            <ErrorMessage name="name" component="div" style={{ color: "red", height: 30 }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="category">Категория</label>
                                            <Field name="category" as="select" className="form-control" id="category">
                                                <option value="">Выберите категорию</option>
                                                <option value="Подшипник">Подшипник</option>
                                                <option value="Двигатель">Двигатель</option>
                                                <option value="Редукторы">Редукторы</option>
                                                <option value="Аккумуляторные батареи">Аккумуляторные батареи</option>
                                            </Field>
                                            <ErrorMessage name="category" component="div" style={{ color: "red", height: 30 }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="cost">Стоимость</label>
                                            <Field name="cost" type="number" className="form-control" id="cost" />
                                            <ErrorMessage name="cost" component="div" style={{ color: "red", height: 30 }} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="description">Описание</label>
                                            <Field name="description" as="textarea" className="form-control" id="description" />
                                            <ErrorMessage name="description" component="div" style={{ color: "red", height: 30 }} />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-50">Добавить товар</button>
                                        <Link className="btn btn-danger w-50 my-2" to={"/employee"}>Назад</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    )
    
}
