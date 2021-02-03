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
    mutation CriarFuncionario($funcionario: FuncionarioInput!){
        criarFuncionario(funcionario: $funcionario) {
            nome
        }
    }
`;

export { CREATE_EMPRESA, CREATE_FUNCIONARIO };