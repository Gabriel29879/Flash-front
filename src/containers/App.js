import React, { useState } from 'react';

import Button from '../components/Button'

import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

const companyArr = [
    {name: "NuBank"},
    {name: "Google"},
    {name: "Razer"},
    {name: "Intel"}
];

const App = () => {
    const [conpany, setConpany] = useState();

    const selectChange = (value) => {
        setConpany(value);
    }

    return (
        <>
        <div className="main-header">Flash</div>
        <div className="container">
            <div className="card">
                <p>Caso tenha interesse, você pode cadastrar sua empresa em nosso sistema ou incluir um novo funcionário em alguma das empresas já existentes.</p>
                <div className="upper-card-btns">
                    <Button text="ADICIONAR EMPRESA" />
                    <Button text="ADICIONAR FUNCIONARIO" />
                </div>
            </div>
            <div className="card middle-card">
                <h2>Selecione uma empresa no campo abaixo para ver sua lista de funcionários.</h2>
                <Select 
                    placeholder={conpany ? "Selecione uma empresa" : "Voce deve criar pelo menos uma empresa"} 
                    style={{ width: 500 }} 
                    onChange={selectChange}>
                    {
                        companyArr.map(item => <Option value={item.name} key={item.name}>{item.name}</Option>)
                    }
                </Select>
            </div>
        </div>
        </>
    );
}

export default App;