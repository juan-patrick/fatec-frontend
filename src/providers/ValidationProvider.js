import React, { createContext } from 'react';

export const ValidationContext = createContext({});

export default function ValidationProvider({ children }) {
  const cpfValidation = (cpf) => {
    let sum = 0;
    let rest = null;
    if (cpf === '00000000000') return false;

    for (let i = 1; i <= 9; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++)
      sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    rest = (sum * 10) % 11;

    if (rest === 10 || rest === 11) rest = 0;
    if (rest !== parseInt(cpf.substring(10, 11))) return false;
    return true;
  };

  const cpfFormat = (string) =>
    string.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

  const cnpjFormat = (string) =>
    string.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');

  return (
    <ValidationContext.Provider
      value={{
        cpfValidation,
        cpfFormat,
        cnpjFormat,
      }}
    >
      {children}
    </ValidationContext.Provider>
  );
}
