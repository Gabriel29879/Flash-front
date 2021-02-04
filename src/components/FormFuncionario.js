import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { CREATE_FUNCIONARIO } from '../schemas/mutations';
import { GET_FUNCIONARIOS } from '../schemas/queries'

import { Select } from 'antd';
const { Option } = Select;

const FormFuncionario = ({ listaEmpresa, showForm }) => {
    const [empresa, setEmpresa] = useState('');
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [CPF, setCPF] = useState('');
    const [email, setEmail] = useState('');
    //Mutação para cadastrar funcionarios
    const [criarFuncionario, { data }] = useMutation(CREATE_FUNCIONARIO, {refetchQueries: [{ query: GET_FUNCIONARIOS, variables: { id: `${empresa}` } }]});


    //Verifica se existe algum campo vazio, se todos os campos estiverem preenchidos o funcionario é criado no bando de dados e
    //o form tem seus campos zerados e então é fechado
    const cadastrarFuncionario = () => {
        const funcionario = {
            empresa: empresa, 
            nome: nome, 
            sobrenome: sobrenome,
            CPF: CPF,
            email: email
        };

        if(!funcionario.empresa || !funcionario.nome || !funcionario.sobrenome || !funcionario.CPF || !funcionario.email) {
            return window.alert('Por favor preencha todos os campos');
        }

        criarFuncionario({ variables: { funcionario } })
        cancelarForm();
    }

    //Limpa todos os campos do form e depois fecha ele
    const cancelarForm = () => {
        setNome('');
        setSobrenome('');
        setCPF('');
        setEmail('');

        showForm('funcionario');
    }

    return (
        <form>
        <h2>Insira as informações do funcionario que deseja cadastrar</h2>
        <div className="form-container">

            <div className="input-cont">
                <div className="input-50">
                    <div className="input-label">
                        <p>Nome</p>
                    </div>
                    <div className="input-100">
                        <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
                    </div>
                </div>

                <div className="white-space">&nbsp;</div>

                <div className="input-50">
                    <div className="input-label">
                        <p>Sobrenome</p>
                    </div>
                    <div className="input-100">
                        <input value={sobrenome} onChange={(e) => setSobrenome(e.target.value)} placeholder="Sobrenome" />
                    </div>
                </div>
            </div>

            <div className="input-cont">

                <div className="input-50">
                    <div className="input-label">
                        <p>CPF</p>
                    </div>
                    <div className="input-100">
                        <input value={CPF} onChange={(e) => setCPF(e.target.value)} placeholder="CPF" />
                    </div>
                </div>

                <div className="white-space">&nbsp;</div>

                <div className="input-50">
                    <div className="input-label">
                        <p>Email</p>
                    </div>
                    <div className="input-100">
                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                </div>

            </div>

            <div className="form-select">
                <div className="input-label">
                    <p>Selecione uma empresa</p>
                </div>
                <Select 
                placeholder="Selecione uma empresa"
                style={{ width: 500 }} 
                onChange={(e) => setEmpresa(e)}>
                    {
                        listaEmpresa ? listaEmpresa.map(item => <Option value={item.id} key={item.id}>{item.nome}</Option>) : ""
                    }
                </Select>
            </div>

            <div className="form-button-container">
                <div className="cancel-form form-button" onClick={() => cancelarForm()}>Cancelar</div>
                <div className="form-button" onClick={() => cadastrarFuncionario()}>Concluir</div>
            </div>

        </div>
    </form>
    );
};

export default FormFuncionario;