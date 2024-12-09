import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'emailMask'
})

export class EmailMask implements PipeTransform {
    transform(value: any, visibleChars: number = 3): string {
        if(!value) return '';

        const atIndex = value.indexOf('@');
        if(atIndex <= visibleChars) return value;

        const maskedPart = value.substring(0, atIndex - visibleChars)
        const visiblePart = '*'.repeat(visibleChars)


        return maskedPart + visiblePart + value.substring(atIndex);
    }
}