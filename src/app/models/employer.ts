export class Employer {
    constructor(
        public id:number,
        public name: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
        public companyName: string,
        public numberOfEmployees: number,
        public isEdit:boolean
    ) { }
}
