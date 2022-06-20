import { v4 } from 'uuid';

class User {
    id: string;

    name: string;

    birth_date: Date;

    cpf: string;

    phone: string;

    created_at: Date;

    updated_at: Date;

    constructor({
        name,
        birth_date,
        cpf,
        phone,
        created_at,
        updated_at,
    }: Omit<User, 'id'>) {
        this.id = v4();
        this.name = name;
        this.birth_date = birth_date;
        this.cpf = cpf;
        this.phone = phone;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }
}

export default User;
