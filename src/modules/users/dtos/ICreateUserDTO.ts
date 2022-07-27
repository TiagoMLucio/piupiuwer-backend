interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  cpf: string;
  birth_date: string;
  phone: string;
  about?: string;
}

export default ICreateUserDTO;
