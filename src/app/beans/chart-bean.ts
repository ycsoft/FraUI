import { Strategy } from './strategy';

export class ChartBean {
  public rule_id: string;
  public small: string;
  public strategy: Array<Strategy>;
  public free: boolean;
  public content: string;
  public price: number;
  public strategylist: Array<any> = [];
  public checked: boolean;
  public name: string;
  public contentSize: number;
  public size: number;
}
