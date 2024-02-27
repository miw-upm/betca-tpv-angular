import {StockAlarmLine} from "./stock-alarm-line.model";

export class StockAlarm {
  name: string;
  description: string;
  warning: number;
  critical: number;
  stockAlarmLines: StockAlarmLine[];
}
