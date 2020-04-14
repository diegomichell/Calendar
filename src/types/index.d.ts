import {Moment} from 'moment';

export interface CalendarEvent {
    id: number,
    description: string,
    date: Moment,
    city: string,
    color: string,
    weather: Weather
}

export interface Weather {
    name: string,
    condition: {
        text: string,
        icon: string
    }
}
