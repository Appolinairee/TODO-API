const taskPriority = ["high", "normal", "low"];

const taskStatus = ["to do", "in progress", "done", "cancelled", "pending"];

class Task {
    #id = "";
    #name = "";
    #description = "";
    #priority = "";
    #status = "";
    #dueDate = new Date();


    currentDate() {
        var date = new Date();
        date.setHours(0, 0, 0, 0); 
        return date;
    }

    validateDateFormat(dateString) {
        const regexDate = /^\d{4}-\d{2}-\d{2}$/;
        
        if(regexDate.test(dateString))
            return true;

        return false;
    }

    #validateId(value) {
        if(!value)
            throw new Error("id should be provided");
        
        if(typeof value !== "string")
            throw new Error("id should be string");
    }

    #validateName(value) {
        if(!value)
            throw new Error("name attribute should be provided");
        
        if(typeof value !== "string")
            throw new Error("name attribute should be string");
    }

    #validateDescription(value) {
        if(!value)
            throw new Error("description attribute should be provided");

        if(typeof value !== "string")
            throw new Error("Task description should be string");
    }

    #validatePriority(value){
        if(value && !taskPriority.includes(value))
            throw new Error("priority should be high, normal or low");   
    }

    #validateStatus(value){
        if(value && !taskStatus.includes(value))
            throw new Error("Task status should be to do, in progress, done, pending or cancelled");
    }

    #validateDueDate(value){
        var date = new Date(value);
        if(value && !this.validateDateFormat(value)) 
            throw new Error("dueDate should be in valid format");
        
        if(value && isNaN(date.getTime()) ) 
            throw new Error("dueDate should be valid");
        
        if(value && date < new Date()) 
            throw new Error("This dueDate has passed");
    }

    constructor(props){
        if(!props)
            throw new Error("parameters are required");

        this.#validateId(props.id);
        this.#validateName(props.name);
        this.#validateDescription(props.description);

        this.#validatePriority(props.priority);
        this.#validateStatus(props.status);
        this.#validateDueDate(props.dueDate);

        // Initialize attributs
        this.#id = props.id;
        this.#name = props.name;
        this.#description = props.description;
        
        if(props.priority && taskPriority.includes(props.priority))
            this.#priority = props.priority;
        else
            this.#priority = taskPriority[1];

        if(props.status && taskStatus.includes(props.status))
            this.#status = props.status;
        else
            this.#status = taskStatus[0];

        
        var date = new Date(props.dueDate);

        if (props.dueDate && this.validateDateFormat(props.dueDate) && !isNaN(date.getTime()) && date >= this.currentDate())
            this.#dueDate = new Date(props.dueDate);
        else
            this.#dueDate = this.currentDate();
    }



    // Code for getters

    get id(){
        return this.#id;
    }

    get name(){
        return this.#name;
    }

    get description(){
        return this.#description;
    }

    get priority(){
        return this.#priority;
    }

    get status(){
        return this.#status;
    }

    get dueDate(){
        return this.#dueDate;
    }


    // Code for setters
    set name(value) {
        this.#validateName(value);
        this.#name = value;
    }
    
    set description(value) {
        this.#validateDescription(value);
        this.#description = value;
    }

    set priority(value) {
        this.#validatePriority(value);

        if(this.#priority && taskPriority.includes(value))
           this.#priority = value;
        else
            this.#priority = taskPriority[1];
    }

    statusSettingIsValid(currentStatus, newStatus){
        if(
           (newStatus === "in progress" && currentStatus === "to do")
           ||
           (newStatus === "done" && currentStatus === "in progress")
           ||
           (newStatus === "cancelled" && currentStatus !== "done")
           ||
           (newStatus === "pending" && currentStatus === "in progress")
           ||
           (newStatus === "in progress" && currentStatus === "pending")
        )
        return true;

        else
            return false;
    }

    set status(value) {
        this.#validateStatus(value);
    
        if(this.statusSettingIsValid(this.#status, value))
            this.#status = value;
        else
            throw new Error(`current status is ${this.#status}, impossible to set it to '${value}'`);
    }

    set dueDate(value){
        this.#validateDueDate(value);

        var date = new Date(value);
        if(date && date > this.#dueDate)
            this.#dueDate = date;
        else
            throw new Error("this dueDate should not be before current dueDate");
    }
    
}