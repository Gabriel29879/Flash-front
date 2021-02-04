import React, { useState  } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';

import { GET_EMPRESAS, GET_FUNCIONARIOS } from '../schemas/queries';

import Button from '../components/Button'

import FormFuncionario from '../components/FormFuncionario';
import FormEmpresa from '../components/FormEmpresa';

import 'antd/dist/antd.css';
import { Table,Select } from 'antd';
const { Option } = Select;


//configuração para o component do ant Table
const columns = [
    {
        title: 'Nome',
        dataIndex: 'nome',
        key: 'nome'
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
    const [idState, setIdState] = useState();
    //quando uma nova empresa é criada newEmpresa 
    //fica com o valor true e permite que a aplicação pegue a nova empresa e exiba ela na tabela
    const [newEmpresa, setNewEmpresa] = useState(false);
    const [showFormFuncionario, setFormFuncionario] = useState(false);
    const [showFormEmpresa, setFormEmpresa] = useState(false);
    const { loading: empresaLoading, error: empresaError, data: empresaData } = useQuery(GET_EMPRESAS);
    const [getFuncionarios, { data: listaFuncionarios }] = useLazyQuery(GET_FUNCIONARIOS, { variables: { id: `${idState}` } });

    //Array usado para armazenar e formatar os dados de empresas
    let companyArr;
    //Array usado para armazenar e formatar os dados de funcionarios
    let funcionarios;
    
    //Função para mostrar ou esconder os dois forms de cadastro pelos botões do card superior
    const showForm = (formType) => {
        switch(formType){
            case 'empresa':
                if(showFormEmpresa) {
                    setFormEmpresa(false);
                    return
                };
                setFormFuncionario(false);
                setFormEmpresa(true);
                return
            case 'funcionario':
                if(showFormFuncionario) {
                    setFormFuncionario(false);
                    return
                };
                setFormEmpresa(false);
                setFormFuncionario(true);
                return
            default:
                setFormEmpresa(false);
                setFormFuncionario(false);
                return
        }
    }
    //Populando o array com os dados de empresas assim que acaba de carregar
    if(!empresaLoading) {
        companyArr = empresaData.getEmpresas;
    }

    //Populando o array com dados de funcionarios assim que acaba de carregar
    if(listaFuncionarios) funcionarios = listaFuncionarios.getFuncionarios;

    //Função para trocar a empresa que é exibida na Table
    const selectChange = (value) => {
        const result = companyArr.filter(item => { if(item.id === value){ return item } else { return null } });
        setConpany(result);
        setIdState(result[0].id);
        getFuncionarios(idState);
    }

    //Mostra algumas informações sobre a empresa acima da Table
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
    
    //Inicializa a aplicação com uma empresa já selecionada para exibição na tambela
    if(companyArr && !idState) {
        let index = companyArr.length - 1;
        selectChange(companyArr[index].id)
    } 

    //Exibe uma empresa recem criada imediatamente após sua criação
    if(companyArr && newEmpresa) {
        let index = companyArr.length - 1;
        selectChange(companyArr[index].id)
        setNewEmpresa(false);
        console.log('rodei')
    }

    return (
        <>
        <div className="main-header"><img src={process.env.PUBLIC_URL + '/flash.png'} alt='flash logo' /></div>
        <div className="card">
            <p>Caso tenha interesse, você pode cadastrar sua empresa em nosso sistema ou incluir um novo funcionário em alguma das empresas já existentes.</p>
            <div className="upper-card-btns">
                {/*Botões utilizados para exibir os forms de cadastro*/}
                <Button text="ADICIONAR EMPRESA" onClick={() => showForm("empresa")} />
                <Button text="ADICIONAR FUNCIONARIO" onClick={() => showForm("funcionario")} />
            </div>
        </div>
        <div className={`card${showFormFuncionario ? "" : "-hidden"}`}>
            <FormFuncionario showForm={showForm} listaEmpresa={companyArr} />
        </div>
        <div className={`card${showFormEmpresa ? "" : "-hidden"} dual-form`}>
            <FormEmpresa showForm={showForm} setNewEmpresa={setNewEmpresa} />
        </div>
        <div className="card middle-card">
            <h2>Selecione uma empresa no campo abaixo para ver sua lista de funcionários.</h2>
            {/* Exibe as empresas cadastradas e permite que selecione uma para exibição na Tabela */}
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
                {/* Exibe os dados da empresa acima da tabela caso existam */}
                {conpany ? renderTableHeader(conpany[0]) : ""}
                <Table columns={columns} dataSource={funcionarios} />
        </div>
        </>
    );
}

export default App;