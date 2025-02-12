import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'uppercaseWords' })
export class UppercaseWordsPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        if (!value) return ''; // Maneja valores nulos o indefinidos

        return value
            .split(/[\s-_]+|(?=[A-Z])/) // Maneja espacios, guiones y camelCase
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
            .join(' ');
    }
}
