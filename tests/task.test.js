const {test} = QUnit;

QUnit.module("Task", () => {
    QUnit.module('constructor', () => {
        test("throws an error when parameters are not specified", assert =>{
            assert.throws(() => {
                new Task();
            }, new Error("parameters are required"));
        });
 
        test("throws an error when id attribute is not provided", assert =>{
            assert.throws(() => {
                new Task({attribut: ""});
            }, new Error("id should be provided"));
        });

        test("throws an error when id attribute is not string", assert =>{
            assert.throws(() => {
                new Task({id: 12});
            }, new Error("id should be string"));
        });

        test("throws an error when name attribute is not provided", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf"});
            }, new Error("name attribute should be provided"));
        })

        test("throws an error when name attribute is not string", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", name: 12});
            }, new Error("name attribute should be string"));
        })

        test("throws an error when description attribute is not provided", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", name: "My task name"});
            }, new Error("description attribute should be provided"));
        })
        
        test("throws an error when description attribute is not string", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", name: "My task name", description: 2});
            }, new Error("Task description should be string"));
        })

        test("update priority to 'normal' by default when it is not specified", assert => {
            const task = new Task({
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "",
                status: "to do"
            });
            assert.equal(task.priority, "normal", "priority should be 'normal' by default");
        });

        test("throws an error when priority is provided but not valid", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", name: "My task name", description: "My task description", priority: "last"});
            }, new Error("priority should be high, normal or low"));
        });

        test("update task status to 'to do' by default when status is not specified", assert => {
            const task = new Task({
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "",
                status: "to do"
            });
            assert.equal(task.priority, "normal", "status should be 'to do' by default");
        });

        test("throws an error when status is provided but not valid", assert=>{
            assert.throws(()=>{
                new Task({id: "etytdtgytf", name: "My task name", description: "My task description", priority: "high", status: "in doing"});
            }, new Error("Task status should be to do, in progress, done, pending or cancelled"));
        })

        test("update dueDate to now date when it is not specified", assert =>{
            const props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do"
            };
            var task = new Task(props);

            assert.deepEqual(task.dueDate, task.currentDate(), "initialize dueDate");
        });

        test("throws an error when dueDate is not in valid format", assert => {
            const props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "12-65-35",
            };

            assert.throws(()=>{
                new Task(props);
            }, new Error("dueDate should be in valid format"));
        });

        test("throws an error when dueDate is provided but not valid", assert => {
            const props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "1253-65-35",
            };

            assert.throws(()=>{
                new Task(props);
            }, new Error("dueDate should be valid"));
        })

        test("throws an error when dueDate has passed", assert => {
            const props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-10-20",
            };
                
            assert.throws(()=>{
                new Task(props);
            }, new Error("This dueDate has passed"));
        })
    })


    QUnit.module('get id', () => {
        test("get task id", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-11-20"
            };
    
            var task = new Task(props);
            assert.equal(task.id, props.id, "get task id");
        });
    })


    QUnit.module('get name', () => {
        test("get name", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-11-20"
            };
    
            var task = new Task(props);
            assert.equal(task.name, props.name, "get name");
        });
    })


    QUnit.module('get description', () => {
        test("get description", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-11-20"
            };
    
            var task = new Task(props);
            assert.equal(task.description, props.description, "get description");
        });
    
    });


    QUnit.module('get priority', () => {
        test("get priority", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-11-20"
            };
    
            var task = new Task(props);
            assert.equal(task.priority, props.priority, "get priority");
        });
    
    })


    QUnit.module('get status', () => {
        test("get status", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-11-20"
            };
    
            var task = new Task(props);
            assert.equal(task.status, props.status, "get status");
        });
    })
    
    
    QUnit.module('get priority', () => {
        test("get priority", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-11-20"
            };
    
            var task = new Task(props);
            assert.deepEqual(task.priority, task.priority, "get priority");
        });
    })


    QUnit.module('get dueDate', () => {
        test("get dueDate", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-11-20"
            };
    
            var task = new Task(props);
            assert.deepEqual(task.dueDate, new Date(props.dueDate), "get dueDate");
        });
    })


    // Tests related to setters
    QUnit.module('set name', () => {
        test("throws an exception when new name is not valid string", assert=>{
            var props = {id: "etytdtgytf", name: "My task name", description: "My task description", priority: "high", status: "to do"};

            task = new Task(props);
            assert.throws(()=>{
                task.name = 4;
            }, new Error("name attribute should be string"));
        });

        test("set name", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" };
            var task = new Task(props);
            task.name = "task name";
    
            assert.equal(task.name, "task name", "set name");
        });
    })


    QUnit.module('set description', () => {
        test("throws an exception when new description is not valid string", assert=>{
            var props = {id: "etytdtgytf", name: "My task name", description: "My task description", priority: "high", status: "to do"};

            task = new Task(props);
            assert.throws(()=>{
                task.description = 4;
            }, new Error("Task description should be string"));
        });

        test("set description", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" };
            var task = new Task(props);
            task.description = "task description";
    
            assert.equal(task.description, "task description", "set description");
        });
    })


    QUnit.module('set priority', () => {
        test("throws an error when new priority is provided but not valid", assert=>{
            var props = {id: "etytdtgytf", name: "My task name", description: "My task description", priority: "high", status: "to do"};

            task = new Task(props);
            assert.throws(()=>{
                task.priority = "big";
            }, new Error("priority should be high, normal or low"));
        });

        test("update 'normal' default value when new priority is not specified", assert => {
            const task = new Task({
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do"
            });

            task.priority = "";
            assert.equal(task.priority, "normal", "priority should be 'normal' by default");
        });

        test("set priority", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" };
            var task = new Task(props);
            task.priority = "low";
    
            assert.equal(task.priority, "low", "set priority");
        });
    })


    QUnit.module('statusSettingIsValid function', () => {
        
        test("return true for: to do => in progress", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" };
            var task = new Task(props);

            assert.ok(task.statusSettingIsValid(task.status, "in progress"));
        });

        test("return true for: in progress => done", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "in progress", dueDate: "2023-11-20" };
            var task = new Task(props);

            assert.ok(task.statusSettingIsValid(task.status, "done"));
        });

        test("return true for: in progress => cancelled", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "in progress", dueDate: "2023-11-20" };
            var task = new Task(props);

            assert.ok(task.statusSettingIsValid(task.status, "cancelled"));
        });

        test("return true for: to do => cancelled", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" };
            var task = new Task(props);

            assert.ok(task.statusSettingIsValid(task.status, "cancelled"));
        });

        test("return true for: pending => cancelled", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "pending", dueDate: "2023-11-20" };
            var task = new Task(props);

            assert.ok(task.statusSettingIsValid(task.status, "cancelled"));
        });

        test("return false for: cancelled => done", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "cancelled", dueDate: "2023-11-20" };
            var task = new Task(props);

            assert.ok(!task.statusSettingIsValid(task.status, "done"));
        });

        test("return true for: pending => in progress", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "pending", dueDate: "2023-11-20" };
            var task = new Task(props);

            assert.ok(task.statusSettingIsValid(task.status, "in progress"));
        });

        test("return true for: in progress => pending", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "in progress", dueDate: "2023-11-20" };
            var task = new Task(props);

            assert.ok(task.statusSettingIsValid(task.status, "pending"));
        });
    })
    

    QUnit.module('set status', () => {
        test("throws an exception when setting: done => to do", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "done", dueDate: "2023-11-20" };
            var task = new Task(props), currentStatus = task.status;
    
            assert.throws(()=>{
                task.status = "to do"
            }, new Error(`current status is ${currentStatus}, impossible to set it to 'to do'`));
        });
    
        test("set status", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" };
            var task = new Task(props);
            task.status = "in progress";
    
            assert.equal(task.status, "in progress", "set status");
        });
    })


    QUnit.module('set dueDate', () => {
        test("validateDateFormat function return true when dueDate format is valid", assert => {
            var props = {
                id: "etytf",
                name: "task 1",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-11-20"
            };
            var task = new Task(props);
        
            assert.ok(task.validateDateFormat(props.dueDate))
        });

        test("throws an error when dueDate is not in valid format", assert => {
            const props = {
                id: "etytdtgytf",
                name: "My task name",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "12-65-35",
            };

            assert.throws(()=>{
                new Task(props);
            }, new Error("dueDate should be in valid format"));
        });

        test("throws error when new dueDate is before current dueDate", assert => {
            var props = {
                id: "etytf",
                name: "task 1",
                description: "My task description",
                priority: "high",
                status: "to do",
                dueDate: "2023-11-20"
            };
        
            var task = new Task(props);
            
            console.log(task.validateDateFormat(task.dueDate))
            assert.throws(() => {
                task.dueDate = "2023-11-20";
            }, new Error("this dueDate should not be before current dueDate"));
        });
    
        test("set dueDate", assert=>{
            var props = { id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" };
            var task = new Task(props);
            task.dueDate = "2023-11-30";
    
            assert.deepEqual(task.dueDate, new Date("2023-11-30"), "set dueDate");
        });
    })
});