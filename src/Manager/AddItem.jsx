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
      
      // const AddProductForm = () => {
      //   const initialValues = {
      //     name: '',
      //     category: '',
      //     cost: 0,
      //     description: '',
      //   };

    const onSubmit = async (values, { setSubmitting }) => {
        await axios.post("http://localhost:8081/banquet/add", values);
        navigate("/employee");
        setSubmitting(false);
    }

    return (
        <div>
        <Formik initialValues={{name: '', category: '', cost: '', description:''}} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <div>
          <label htmlFor="name">Название товара</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component="div" />
        </div>
        <div>
          <label htmlFor="category">Категория</label>
          <Field name="category" as="select">
            <option value="">Выберите категорию</option>
            <option value="Подшипник">Подшипник</option>
            <option value="Двигатель">Двигатель</option>
            <option value="Редукторы">Редукторы</option>
            <option value="Аккумуляторные батареи">Аккумуляторные батареи</option>
          </Field>
          <ErrorMessage name="category" component="div" />
        </div>
        <div>
          <label htmlFor="cost">Стоимость</label>
          <Field name="cost" type="number" />
          <ErrorMessage name="cost" component="div" />
        </div>
        <div>
          <label htmlFor="description">Описание</label>
          <Field name="description" as="textarea" />
          <ErrorMessage name="description" component="div" />
        </div>
        <button type="submit">Добавить товар</button>
      </Form>
    </Formik>
    </div>

    )
}
// }
