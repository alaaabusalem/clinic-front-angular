import { DatePipe } from '@angular/common';

export class User {

    private datePipe: DatePipe;
    constructor(
        public name: string,
        public email: string,
        private _token: string,
        public expired: Date,
        public role: string) {

        //this.datePipe = new DatePipe('en-US');
       
           }

    get token() {
        const currentDate = new Date();
        
        if (this.expired >= currentDate) return this._token;
        return null;
    }


   
}