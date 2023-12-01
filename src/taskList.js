const listStory = [
    "actived",
    "completed",
    "pending"
];
 
class TaskList {  
    #id = "";
    #name = "";
    #listState = "";
    #list = [];

    #validateId(value) {
        if(!value)
            throw new Error("TaskList id should be provided");
        
        if(typeof value !== "string")
            throw new Error("TaskList id should be string");
    }

    #validateName(value) {
        if(!value)
            throw new Error("TaskList name attribute should be defined");
        
        if(typeof value !== "string")
            throw new Error("Tasklist name attribute should be string");
    }

    #validateStatus(value){
        if(value && !listStory.includes(value))
            throw new Error("Task status should be actived, completed or pending");
    }

    #validateTaskList(value){
        if(value && !Array.isArray(value))
            throw new Error("task list should be an array");

        if(value && Array.isArray(value) && !value.every(task => task instanceof Task))
            throw new Error("task list elements should be instance of Task");
    }

    constructor(props){
        if(!props)
            throw new Error("parameters are required");

        this.#validateId(props.id);
        this.#validateName(props.name);
        this.#validateStatus(props.listState);
        this.#validateTaskList(props.list);

        
        // attributs initialization
        this.#id = props.id;
        this.#name = props.name;
        
        if(props.listState && !listStory.includes(props.listState))
            this.#listState = props.listState;
        else
            this.#listState = "actived";

        if(props.list && Array.isArray(props.list) && props.list.length !== 0)
            this.#list = this.sortListBydueDate(props.list);
        else
            this.#list = [];
        
    }

    sortListBydueDate(list){
        return list.sort((task1, task2) => task1.dueDate - task2.dueDate);
    }

    addTask(task){
        if(!(task instanceof Task))
            throw new Error("task list elements should be instance of Task");

        if(!this.list.every(taskp => taskp.id !== task.id))
            throw new Error("This task already exists");

        this.list.push(task);
        return this.sortListBydueDate(this.list);
    }

    removeTaskById(id){
        if(this.list.length === 0 || (this.list.filter(task => task.id === id)).length == 0)
            throw new Error("task with this id is not founded");
        else
            return this.list = this.list.filter(task => task.id !== id)
    }

    get name() {
        return this.#name;
    }

    get listState() {
        return this.#listState;
    }

    get list() {
        return this.#list;
    }


    set name(value){
        this.#validateName(value);

        this.#name = value;
    }

    set listState(value){
        this.#validateStatus(value);

        if(value === "completed")
            throw new Error("before make this list completed, all tasks should be done");
        
        else if(value && listStory.includes(value))
            this.#listState = value;   
        else
            this.#listState = "actived"
    }

    set list(list){
        this.#validateTaskList(list);

        this.#list = this.sortListBydueDate(list);
    }
}