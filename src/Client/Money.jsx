import React from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import './menu.css'

export const Money = () => {

    const { register, formState: { errors }, handleSubmit} = useForm({
        mode: "onBlur"
    });

    let navigate = useNavigate();

    const onSubmit = async (e) => {
        console.log(e);
        await axios.put(`http://localhost:8081/client/money/${localStorage.getItem("id")}`, e);
        navigate("/user");
    }

    return (
        <div className='menu'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card p-3 mb-2 p-3 mb-2 bg-info text-dark shadow">
                            <div className="card-header">Пополнение баланса</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <label htmlFor="cash">Сумма</label>
                                        <input type={"number"} className="form-control" id="cash" placeholder="Cash"  {...register("cash", { required: "Поле обязательно к заполнению", min: { value: 1, message: "Минимальное значение: 1" } })} />
                                        <div style={{ color: "red", height: 30 }}>
                                            {errors?.cash && <p>{errors?.cash?.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cardNumber">Номер карты</label>
                                        <input type={"text"} className="form-control" id="cardNumber" placeholder="Номер карты" {...register("cardNumber", { required: "Поле обязательно к заполнению", pattern: { value: /^[0-9]{16}$/, message: "Номер карты должен состоять из 16 цифр" } })} />
                                        <div style={{ color: "red", height: 30 }}>
                                            {errors?.cardNumber && <p>{errors?.cardNumber?.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="expiryDate">Срок действия карты</label>
                                        <input type={"text"} className="form-control" id="expiryDate" placeholder="MM/YY" {...register("expiryDate", { required: "Поле обязательно к заполнению", pattern: { value: /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/, message: "Введите дату в формате MM/YY" } })} />
                                        <div style={{ color: "red", height: 30 }}>
                                            {errors?.expiryDate && <p>{errors?.expiryDate?.message}</p>}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cvv">CVV код</label>
                                        <input type={"password"} className="form-control" id="cvv" placeholder="CVV" {...register("cvv", { required: "Поле обязательно к заполнению", pattern: { value: /^[0-9]{3}$/, message: "CVV код должен состоять из 3 цифр" } })} />
                                        <div style={{ color: "red", height: 30 }}>
                                            {errors?.cvv && <p>{errors?.cvv?.message}</p>}
                                        </div>
                                    </div>
                                    <button type={"submit"} className="btn btn-primary w-50">Добавить</button>
                                </form>
                                <Link className="btn btn-danger w-50 my-2" to={"/user"}>Назад</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default Money;