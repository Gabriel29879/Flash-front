import { gql } from '@apollo/client';

const CREATE_EMPRESA = gql`
    mutation CriarEmpresa($empresa: EmpresaInput!){
        criarEmpresa(empresa: $empresa){
            id
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