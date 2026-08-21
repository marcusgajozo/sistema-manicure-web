export interface AgendamentoProps {
  id: string;
  clientName?: string;
  procedureName?: string;
  startDate?: string;
  endDate?: string;
  clientId?: string;
  phoneClient?: string;
  procedureId?: string;
  procedurePrice?: number;
  procedureFollowUpDays?: number;
}

export class AgendamentoEntity {
  readonly id: string;
  readonly clientName?: string;
  readonly procedureName?: string;
  readonly startDate?: string;
  readonly endDate?: string;
  readonly clientId?: string;
  readonly phoneClient?: string;
  readonly procedureId?: string;
  readonly procedurePrice?: number;
  readonly procedureFollowUpDays?: number;

  constructor(props: AgendamentoProps) {
    this.id = props.id;
    this.clientName = props.clientName;
    this.procedureName = props.procedureName;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
    this.clientId = props.clientId;
    this.phoneClient = props.phoneClient;
    this.procedureId = props.procedureId;
    this.procedurePrice = props.procedurePrice;
    this.procedureFollowUpDays = props.procedureFollowUpDays;
  }

  toCreateDto() {
    return {
      clientId: this.clientId,
      clientName: this.clientName,
      phoneClient: this.phoneClient,
      procedureId: this.procedureId,
      procedureName: this.procedureName,
      procedurePrice: this.procedurePrice,
      procedureFollowUpDays: this.procedureFollowUpDays,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }

  toUpdateDto() {
    return {
      clientId: this.clientId,
      clientName: this.clientName,
      phoneClient: this.phoneClient,
      procedureId: this.procedureId,
      procedureName: this.procedureName,
      procedurePrice: this.procedurePrice,
      procedureFollowUpDays: this.procedureFollowUpDays,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }

  toPlain(): AgendamentoPlain {
    return {
      id: this.id,
      clientId: this.clientId,
      clientName: this.clientName,
      phoneClient: this.phoneClient,
      procedureId: this.procedureId,
      procedureName: this.procedureName,
      procedurePrice: this.procedurePrice,
      procedureFollowUpDays: this.procedureFollowUpDays,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}

export type AgendamentoPlain = {
  id: string;
  clientId?: string;
  clientName?: string;
  phoneClient?: string;
  procedureId?: string;
  procedureName?: string;
  procedurePrice?: number;
  procedureFollowUpDays?: number;
  startDate?: string;
  endDate?: string;
};
