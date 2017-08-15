import { City } from 'app/beans/city';

export interface Province {
    name: string;
    city: Array<City>;
}
