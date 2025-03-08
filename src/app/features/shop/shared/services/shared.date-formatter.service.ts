import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class SharedDateFormatterService {
    formatDate(dateStr: Date | null) {
        if (!dateStr) return null;
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return null;
        const pad = (num: number) => num.toString().padStart(2, '0');
        return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} 00:00:00`;
    }

    formatDateToStringRemoveZ(date: Date): string {
        if (!date) return '';
        return new Date(date).toISOString().replace("Z","");
    }
}