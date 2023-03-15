export class ToDo {
    public id: number;
    public description:string;
    public dueDate : Date;
    public done: boolean;

    constructor(data: any = null){
        data = data ? JSON.parse(JSON.stringify(data)): {};

        this.id = data.id != null ? Number(data.id): null;
        this.description = data.description != null ? String(data.description): null;
        this.dueDate = data.dueDate != null ? new Date(data.dueDate): null;
        this.done = data.done != null ? Boolean(data.done): null;

    }

}