import { DatePipe } from '@angular/common';

export class User {

    private datePipe: DatePipe;
    constructor(
        public name: string,
        public email: string,
        private _token: string,
        public expired: Date |string,
        public role: string) {
        this.datePipe = new DatePipe('en-US');
         this.expired = this.datePipe.transform(this.expired, 'MM/dd/yyyy hh:mm:ss a');

    }

    get token() {
        const currentDate = new Date();
        const formattedDate = this.datePipe.transform(currentDate, 'MM/dd/yyyy hh:mm:ss a');
        //onst expiredDate = new Date(this.expired);
        //const formattedExpired = this.datePipe.transform(this.expired, 'MM/dd/yyyy hh:mm:ss a');
        console.log(formattedDate);
        console.log(this.expired);

        //const dateNow = new Date(formattedDate);
        //const date2 = new Date(formattedExpired);
        if (this.expired > formattedDate) return this._token;
        return null;
    }
}