import React,{useEffect, useState, useCallback} from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from "axios";

export const NewProposal = () => {

    const [cost,setProduct]=useState(0);

    const { register, formState: { errors }, handleSubmit, setValue, getValues } = useForm({
        mode: "onBlur"
    });

    const { id } = useParams();

    let navigate = useNavigate();

    const loadProduct=useCallback(async()=>{
        const result = await axios.get(`http://localhost:8081/banquet/one/${id}`);
            setProduct(result.data.cost);
    }, [id]);

    useEffect(() => {
        loadProduct();
    }, [loadProduct]);

    const onSubmit = async (e) => {
        console.log(e);
         await axios.post(`http://localhost:8081/proposal/add`, e);
        navigate("/user");
    }

    return (
    <div>
    <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card p-3 mb-2 p-3 mb-2 bg-info text-dark shadow">
                    <div className="card-header">Формирование заякви</div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="amt">Количество предметов</label>
                                <input id="amt" className="form-control" type={"number"}  {...register("amt", { required: "Поле обязательно к заполнению" })} />
                                <div style={{ color: "red", height: 30 }}>
                                    {errors?.amt && <p>{errors?.amt?.message}</p>}
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="deliverytime">Дата доставки</label>
                                <input id="deliverytime" className="form-control" type={"date"}  {...register("deliverytime", { valueAsDate: true, required: "Поле обязательно к заполнению" })} />
                                <div style={{ color: "red", height: 30 }}>
                                    {errors?.deliverytime && <p>{errors?.deliverytime?.message}</p>}
                                </div>
                            </div>
                            <button type={"submit"} className="btn btn-primary w-50" onClick={() => {
                                setValue('clientId', { id: localStorage.getItem("id") });
                                setValue('productId', { id: id });
                                const amt = getValues("amt");
                                setValue("totalCost", amt * cost);
                                setValue("approve", false);
                            }}>Добавить</button>
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