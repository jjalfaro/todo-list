import { ToDo } from "./todo";
import * as dayjs from "dayjs";
// Importing dependent plugins
import utc from "dayjs/plugin/utc";

export class CreateUpdateToDoDTO {
    public readonly description: string;
    public readonly dueDate: string;
    public readonly done:boolean
    
    constructor(data: ToDo) {


        this.description = data.description ;
        this.dueDate = dayjs(data.dueDate).isUTC() ?  data.dueDate.toString() : dayjs(data.dueDate).utc().format();
        this.done = data.done;
    }
 }
