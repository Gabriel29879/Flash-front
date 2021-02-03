import React, { useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_EMPRESAS, GET_FUNCIONARIOS } from '../queries/queries';

import Button from '../components/Button'

import 'antd/dist/antd.css';
import { Table,Select } from 'antd';
const { Option } = Select;

const funcionarios = [
    { name: "Lucas Martir", CPF: "222.333.444-87", email: "teste@teste.com" },
    { name: "Lucas Martir", CPF: "222.333.444-87", email: "teste@teste.com" },
    { name: "Lucas Martir", CPF: "222.333.444-87", email: "teste@teste.com" },
    { name: "Lucas Martir", CPF: "222.333.444-87", email: "teste@teste.com" },
    { name: "Lucas Martir", CPF: "222.333.444-87", email: "teste@teste.com" },
]

const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'CPF',
        dataIndex: 'CPF',
        key: 'CPF',
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    }
]

const App = () => {
    const [conpany, setConpany] = useState();
    const { loading, error, data } = useQuery(GET_EMPRESAS);

    let companyArr;

    if(!loading) {
        companyArr = data.getEmpresas;
        console.log(companyArr);
    }

    const selectChange = (value) => {
        const result = companyArr.filter(item => { if(item.id === value){ return item } else { return null } });
        setConpany(result);
        console.log(conpany);
    }

    const renderTableHeader = (conpany) => {
        if(conpany) {
            return (
                <>
                    <h1>{conpany.nome}</h1>
                    <p>{"CNPJ: " + conpany.cnpj}</p>
                    <p>{
                            "Endereço: " +
                            conpany.endereco.rua + ", " + 
                            conpany.endereco.numero + ", " +
                            conpany.endereco.cidade + " - " + 
                            conpany.endereco.estado + ", " + 
                            conpany.endereco.CEP
                        }</p>
                    <p>{"Beneficios: " + conpany.beneficios}</p>
                </>
            );
        }
    }

    return (
        <>
        <div className="main-header">Flash</div>
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
                placeholder="Selecione uma empresa"
                style={{ width: 500 }} 
                onChange={selectChange}>
                {
                    companyArr ? companyArr.map(item => <Option value={item.id} key={item.id}>{item.nome}</Option>) : ""
                }
            </Select>
        </div>
        <div className="card table">
                {conpany ? renderTableHeader(conpany[0]) : ""}
                <Table columns={columns} dataSource={funcionarios} />
        </div>
        </>
    );
}

export default App;