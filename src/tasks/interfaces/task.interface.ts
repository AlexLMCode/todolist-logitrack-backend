export namespace TasksInterfaces {
    export interface ITask {
        id: number;
        title:string;
        description: string;
        createdAt: string;
        updateAt: string;
        completed: boolean;
    } 
}