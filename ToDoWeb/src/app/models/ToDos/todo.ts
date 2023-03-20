export class ToDo {
    public id: number;
    public description: string;
    public dueDate: Date;
    public done:boolean
    
    constructor(data: any = null) {
        //Técnica de deep copy para eliminar referencias de memoria
        data = data ? JSON.parse(JSON.stringify(data)) : {};

        this.id =  Number(data.id) ;
        this.description = data.description != null ? data.description : null;
        this.dueDate =  new Date(data.dueDate.toISOString()) ;
        this.done = data.done != null ? data.done: null;
    }
 }