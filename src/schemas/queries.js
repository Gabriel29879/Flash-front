import { gql } from '@apollo/client';

const GET_EMPRESAS = gql`
    {
        getEmpresas {
        id
        nome
        cnpj
        endereco {
            cidade
            estado
            rua
            numero
            CEP
        }
        beneficios
        }
    }
`;

const GET_FUNCIONARIOS = gql`
    query getFuncionarios($id: ID!){
        getFuncionarios(id: $id) {
        nome
        sobrenome
        CPF
        email
        }
    }
`;

export { GET_EMPRESAS, GET_FUNCIONARIOS };