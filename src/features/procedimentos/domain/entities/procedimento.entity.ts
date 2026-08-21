export interface ProcedimentoProps {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  returnDays: number;
  durationMinutes: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
  userId?: string;
}

export class ProcedimentoEntity {
  readonly id: string;
  readonly name: string;
  readonly description?: string | null;
  readonly price: number;
  readonly returnDays: number;
  readonly durationMinutes: number;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly deletedAt?: string | null;
  readonly userId?: string;

  constructor(props: ProcedimentoProps) {
    this.id = props.id;
    this.name = props.name;
    this.description = props.description;
    this.price = props.price;
    this.returnDays = props.returnDays;
    this.durationMinutes = props.durationMinutes;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
    this.userId = props.userId;
  }

  toCreateDto() {
    return {
      name: this.name,
      description: this.description ?? undefined,
      price: this.price,
      returnDays: this.returnDays,
      durationMinutes: this.durationMinutes,
    };
  }

  toUpdateDto() {
    return {
      name: this.name,
      description: this.description ?? undefined,
      price: this.price,
      returnDays: this.returnDays,
      durationMinutes: this.durationMinutes,
    };
  }

  toPlain(): ProcedimentoPlain {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      returnDays: this.returnDays,
      durationMinutes: this.durationMinutes,
    };
  }
}

export type ProcedimentoPlain = {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  returnDays: number;
  durationMinutes: number;
};
