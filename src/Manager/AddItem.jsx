import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {useNavigate } from 'react-router-dom';
import axios from "axios";

export const AddItem=()=> {
    let navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Обязательное поле'),
        cost: Yup.number().required('Обязательное поле'),
        description: Yup.string().required('Обязательное поле'),
      });

    const onSubmit = async (values, { setSubmitting }) => {
        await axios.post("http://localhost:8081/banquet/add", values);
        navigate("/employee");
        setSubmitting(false);
    }

    return (
      <div className='back-color'>
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-md-6">
                      <div className="card p-3 mb-2 p-3 mb-2 bg-info text-dark shadow">
                          <div className="card-header">Добавление товара</div>
                          <div className="card-body">
                              <Formik initialValues={{name: '', category: '', cost: '', description:''}} validationSchema={validationSchema} onSubmit={onSubmit}>
                                  {({ isSubmitting }) => (
                                      <Form>
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
                                                  <option value="Муфты">Муфты</option>
                                                  <option value="Крановое оборудование">Крановое оборудование</option>
                                                  <option value="Переключатель ответвлений">Переключатель ответвлений</option>
                                                  <option value="Конвертеры KWD">Конвертеры KWD</option>
                                                  <option value="Высоковольтные двигатели KWD">Высоковольтные двигатели KWD</option>
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
                                          <button type="submit" className="btn btn-primary w-50" disabled={isSubmitting}>Добавить товар</button>
                                      </Form>
                                  )}
                              </Formik>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  );
  
}

