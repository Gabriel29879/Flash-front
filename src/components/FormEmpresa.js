import { useMutation } from '@apollo/client';
import React, { useState } from 'react';

import { CREATE_EMPRESA } from '../schemas/mutations';
import { GET_EMPRESAS } from '../schemas/queries'

import { Checkbox } from 'antd';

const FormEmpresa = ({ showForm, setNewEmpresa }) => {
    const [nome, setNome] = useState('');
    const [nomeFantasia, setNomeFantasia] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [CEP, setCEP] = useState('');
    const [valeAlimentacao, setValeAlimentacao] = useState(false);
    const [valeTransporte, setValeTransporte] = useState(false);
    //Mutação para criar uma empresa, assim que criada ela realiza novamente o query get_empresas para atualizar as informações do client
    const [criarEmpresa, { data }] = useMutation(CREATE_EMPRESA, {refetchQueries: [{ query: GET_EMPRESAS }]});

    //Se todos os campos estiverem preenchidos a função cria a empresa no banco de dados e no final limpa os campos e fecha o form
    const cadastrarEmpresa = () => {
        const beneficios = [];

        if(valeAlimentacao) beneficios.push("VA");
        if(valeTransporte) beneficios.push("VT");

        const empresa = {
            nome,
            nomeFantasia,
            cnpj,
            cidade,
            estado,
            rua,
            numero,
            CEP,
            beneficios
        };

        if( 
            !empresa.nome || !empresa.nomeFantasia || 
            !empresa.cnpj || !empresa.cidade || !empresa.estado || 
            !empresa.rua || !empresa.numero || !empresa.CEP || 
            empresa.beneficios.length <= 0
        ) {
            return window.alert('Por favor preencha todos os campos');
        } 

        criarEmpresa({ variables: { empresa } });
        cancelarForm();
        setNewEmpresa(true);
    }

    //controle de estado para as opções de beneficios
    const valeChange = (tipoVale) => {
        switch(tipoVale){
            case 'VA':
                setValeAlimentacao(!valeAlimentacao);
                return
            case 'VT':
                setValeTransporte(!valeTransporte);
                return
            default:
                return
        }
    }

    //Limpa todos os campos do form e fecha ele
    const cancelarForm = () => {
        setNome('');
        setNomeFantasia('');
        setCnpj('');
        setCidade('');
        setEstado('');
        setRua('');
        setNumero('');
        setCEP('');
        setValeAlimentacao(false);
        setValeTransporte(false);

        showForm('empresa');
    }

    return (
        <form>
            <h2>Insira as informações da empresa que deseja cadastrar</h2>
            <div className="form-container">

                <div className="input-cont">
                    <div className="input-100">
                        <div className="input-label">
                            <p>Nome</p>
                        </div>
                        <div className="input-100">
                            <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome" />
                        </div>
                    </div>
                </div>

                <div className="input-cont">

                    <div className="input-50">
                        <div className="input-label">
                            <p>Nome fantasia</p>
                        </div>
                        <div className="input-100">
                            <input value={nomeFantasia} onChange={(e) => setNomeFantasia(e.target.value)} placeholder="Nome fantasia" />
                        </div>
                    </div>
                    <div className="white-space">&nbsp;</div>
                    <div className="input-50">
                        <div className="input-label">
                            <p>CNPJ</p>
                        </div>
                        <div className="input-100">
                            <input value={cnpj} onChange={(e) => setCnpj(e.target.value)} placeholder="CNPJ" />
                        </div>
                    </div>

                </div>

                <div className="input-cont">
                    <div className="input-50">
                        <div className="input-label">
                            <p>Benefícios</p>
                        </div>
                        <div className="input-check">
                            <Checkbox checked={valeAlimentacao} onChange={() => valeChange('VA')}>Vale Alimentação</Checkbox>
                            <Checkbox checked={valeTransporte} onChange={() => valeChange('VT')}>Vale Transporte</Checkbox>
                        </div>
                    </div>
                </div>

                <div className="form-sub-title">
                    <p>Qual a localização da sua empresa?</p>
                </div>

                <div className="input-cont">
                    <div className="input-CEP">
                        <div className="input-label">
                            <p>CEP</p>
                        </div>
                        <div className="input-100">
                            <input value={CEP} onChange={(e) => setCEP(e.target.value)} placeholder="CEP" />
                        </div>
                    </div>
                </div>

                <div className="input-cont">
                    <div className="input-100">
                        <div className="input-label">
                            <p>Rua</p>
                        </div>
                        <div className="input-100">
                            <input value={rua} onChange={(e) => setRua(e.target.value)} placeholder="Rua" />
                        </div>
                    </div>
                </div>

                <div className="input-cont">

                    <div className="input-estado">
                        <div className="input-label">
                            <p>Estado</p>
                        </div>
                        <div className="input-100">
                            <input value={estado} onChange={(e) => setEstado(e.target.value)} placeholder="Estado" />
                        </div>
                    </div>
                    
                    <div className="white-space">&nbsp;</div>

                    <div className="input-cidade">
                        <div className="input-label">
                            <p>Cidade</p>
                        </div>
                        <div className="input-100">
                            <input value={cidade} onChange={(e) => setCidade(e.target.value)} placeholder="Cidade" />
                        </div>
                    </div>

                    <div className="white-space">&nbsp;</div>

                    <div className="input-numero">
                        <div className="input-label">
                            <p>Número</p>
                        </div>
                        <div className="input-100">
                            <input value={numero} onChange={(e) => setNumero(e.target.value)} placeholder="Número" />
                        </div>
                    </div>

                </div>

                <div className="form-button-container">
                        <div className="cancel-form form-button" onClick={() => cancelarForm()}>Cancelar</div>
                        <div className="form-button" onClick={() => cadastrarEmpresa()}>Concluir</div>
                </div>

            </div>
        </form>
    );
}

export default FormEmpresa;