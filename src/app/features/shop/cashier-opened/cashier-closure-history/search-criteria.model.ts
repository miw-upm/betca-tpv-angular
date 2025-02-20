import {Moment} from "moment";

export enum SEARCH_PERIOD { MONTH = "month", YEAR = "year" }

export interface SearchCriteria {
    start_date: Moment;
    period: SEARCH_PERIOD;
}