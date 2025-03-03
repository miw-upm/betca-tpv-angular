import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class SharedDateFormatterService {
    formatDate(dateStr: Date | null) {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} 00:00:00`;
    }
}