import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "FormatNumber" })
export class FormatNumberPipe implements PipeTransform {
  transform(n: any): string {
    if (n == null) return "";
    var parts = n.toString().split(".");

    const numberPart = parts[0];
    const decimalPart = parts[1];
    const thousands = /\B(?=(\d{3})+(?!\d))/g;
    return numberPart.replace(thousands, " ") + (decimalPart ? "." + decimalPart : "");

  }
}