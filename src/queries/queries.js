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
  {
    getFuncionarios(id: "6018ac84bc8f1849a86d91af") {
      nome
      sobrenome
      CPF
      email
    }
  }
  
`;

export { GET_EMPRESAS, GET_FUNCIONARIOS };