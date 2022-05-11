export class Events {

    constructor(
      public id?: number,
      public name: string = '',
      public description: string = '',
      public type: string = '',
      public address: string = '',
      public start_date?: Date  ,
      public end_date?: Date ,
      public closed: boolean = true     
   
    ) { }
  }
