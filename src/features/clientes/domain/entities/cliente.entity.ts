export interface ClienteProps {
  id: string;
  name: string;
  phone: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  userId?: string;
}

export class ClienteEntity {
  readonly id: string;
  readonly name: string;
  readonly phone: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly deletedAt?: string | null;
  readonly userId?: string;

  constructor(props: ClienteProps) {
    this.id = props.id;
    this.name = props.name;
    this.phone = props.phone;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
    this.userId = props.userId;
  }

  toCreateDto() {
    return {
      name: this.name,
      phone: this.phone,
    };
  }

  toUpdateDto() {
    return {
      name: this.name,
      phone: this.phone,
    };
  }

  toPlain(): ClientePlain {
    return {
      id: this.id,
      name: this.name,
      phone: this.phone,
    };
  }
}

export type ClientePlain = {
  id: string;
  name: string;
  phone: string;
};
