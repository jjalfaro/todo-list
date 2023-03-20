import { ToDo } from "./ToDo";
export class InsertUpdateToDoDTO {
    public readonly id: number;
    public readonly description: string;
    public readonly dueDate: Date;
    public readonly done: boolean;

    constructor(data:ToDo){
        this.id = data.id;
        this.description = data.description;
        this.done = data.done;
        this.dueDate = data.dueDate;
    }
}