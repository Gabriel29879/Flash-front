import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { CREATE_FUNCIONARIO } from '../schemas/mutations';

import { Select } from 'antd';
const { Option } = Select;

const FormFuncionario = ({ listaEmpresa }) => {
    const [empresa, setEmpresa] = useState();
    const [nome, setNome] = useState();
    const [sobrenome, setSobrenome] = useState();
    const [CPF, setCPF] = useState();
    const [email, setEmail] = useState();
    const [criarFuncionario, { data }] = useMutation(CREATE_FUNCIONARIO);

    const cadastrarEmpresa = () => {
        console.log(empresa, nome, sobrenome, CPF, email);
        const funcionario = {
            empresa: empresa, 
            nome: nome, 
            sobrenome: sobrenome,
            CPF: CPF,
            email: email
        };
        criarFuncionario({ variables: { funcionario: funcionario } })
    }

    return (
        <form>
            <label>Empresa</label><br />
            <Select 
                placeholder="Selecione uma empresa"
                style={{ width: 500 }} 
                onChange={(e) => setEmpresa(e)}>
                {
                    listaEmpresa ? listaEmpresa.map(item => <Option value={item.id} key={item.id}>{item.nome}</Option>) : ""
                }
            </Select>
            <br />
            <label>Nome</label><br />
            <input onChange={(e) => setNome(e.target.value)}></input>
            <br />
            <label>Sobrenome</label><br />
            <input onChange={(e) => setSobrenome(e.target.value)}></input>
            <br />
            <label>CPF</label><br />
            <input onChange={(e) => setCPF(e.target.value)}></input>
            <br />
            <label>Email</label><br />
            <input onChange={(e) => setEmail(e.target.value)}></input>
            <br />
            <div className="form-button" onClick={() => cadastrarEmpresa()}>Cadastrar</div>
        </form>
    );
};

export default FormFuncionario;