export interface TimeOffProps {
  id: string;
  reason: string;
  startDate?: string;
  endDate?: string;
}

export class TimeOffEntity {
  readonly id: string;
  readonly reason: string;
  readonly startDate?: string;
  readonly endDate?: string;

  constructor(props: TimeOffProps) {
    this.id = props.id;
    this.reason = props.reason;
    this.startDate = props.startDate;
    this.endDate = props.endDate;
  }

  toCreateDto() {
    return {
      reason: this.reason,
      startDate: this.startDate ?? "",
      endDate: this.endDate ?? "",
    };
  }

  toUpdateDto() {
    return {
      reason: this.reason,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }

  toPlain(): TimeOffPlain {
    return {
      id: this.id,
      reason: this.reason,
      startDate: this.startDate,
      endDate: this.endDate,
    };
  }
}

export type TimeOffPlain = {
  id: string;
  reason: string;
  startDate?: string;
  endDate?: string;
};
