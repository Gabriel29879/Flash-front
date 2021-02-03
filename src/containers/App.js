import React, { useState } from 'react';

import Button from '../components/Button'

import 'antd/dist/antd.css';
import { Select } from 'antd';
const { Option } = Select;

const companyArr = [
    {id: 1, name: "NuBank", CNPJ: "14.390.714/0001-68", endereco: { cidade: "Curitiba", estado: "Parana", rua: "Av teste", numero: "365", CEP: "87641-230" }, beneficios: ["VA", "VT"]},
    {id: 2, name: "Google", CNPJ: "14.390.714/0001-68", endereco: { cidade: "Curitiba", estado: "Parana", rua: "Av teste", numero: "365", CEP: "87641-230" }, beneficios: ["VA", "VT"]},
    {id: 3, name: "Razer", CNPJ: "14.390.714/0001-68", endereco: { cidade: "Curitiba", estado: "Parana", rua: "Av teste", numero: "365", CEP: "87641-230" }, beneficios: ["VA", "VT"]},
    {id: 4, name: "Intel", CNPJ: "11.222.333/0001-68", endereco: { cidade: "Curiasefase", estado: "aesfase", rua: "Av dhte", numero: "222", CEP: "22222-222" }, beneficios: ["VA", "VT"]}
];

const App = () => {
    const [conpany, setConpany] = useState();

    const selectChange = (value) => {
        const result = companyArr.filter(item => { if(item.id === value){ return item } else { return null } });
        setConpany(result);
        console.log(conpany);
    }

    const renderTableHeader = (conpany) => {
        if(conpany) {
            return (
                <>
                    <h1>{conpany.name}</h1>
                    <p>{"CNPJ: " + conpany.CNPJ}</p>
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
                        companyArr.map(item => <Option value={item.id} key={item.id}>{item.name}</Option>)
                    }
                </Select>
            </div>
            <div className="card table">
                    {conpany ? renderTableHeader(conpany[0]) : ""}
            </div>
        </div>
        </>
    );
}

export default App;