import { gql } from '@apollo/client';

const CREATE_EMPRESA = gql`
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

const CREATE_FUNCIONARIO = gql`
    mutation criarFuncionario($empresa: ID!, $nome: String!, $sobrenome: String!, $CPF: String!, $email: String!){
        criarFuncionario(empresa: $empresa, nome: $nome, sobrenome: $sobrenome, CPF: $CPF, email: $email) {
            nome
        }
    }
`;

export { CREATE_EMPRESA, CREATE_FUNCIONARIO };