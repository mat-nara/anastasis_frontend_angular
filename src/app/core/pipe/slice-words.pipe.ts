import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "sliceWords" })
export class SliceWordsPipe implements PipeTransform {
  transform(value: string, start: number, end: number): string {
    if (value == null) return "";


    if(value.split(" ").length >= end){
        return value.split(" ")
                    .splice(start, end)
                    .join(" ")
                    .concat(' ...');
    }else{
        return value.split(" ")
                    .splice(start, end)
                    .join(" ");
    }

    
  }
}