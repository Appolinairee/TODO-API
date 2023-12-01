const {test} = QUnit;

QUnit.module("TaskList", () => {
    QUnit.module('constructor', () => {
        test("throws an error when parameters are not specified", assert =>{
            assert.throws(() => {
                new TaskList();
            }, new Error("parameters are required"));
        });

        test("throws an error when id attribute is not provided", assert =>{
            assert.throws(() => {
                new TaskList({attribut: ""});
            }, new Error("TaskList id should be provided"));
        });

        test("throws an error when id attribute is not string", assert =>{
            assert.throws(() => {
                new TaskList({id: 12});
            }, new Error("TaskList id should be string"));
        });

        test("throws an error when tasklist name attribute is not specified", assert=>{
            assert.throws(()=>{
                new TaskList({id: "etytdtgytf"});
            }, new Error("TaskList name attribute should be defined"));
        })

        test("throws an error when name attribute is not string", assert=>{
            assert.throws(()=>{
                new TaskList({id: "etytdtgytf", name: 12});
            }, new Error("Tasklist name attribute should be string"));
        });

        test("update listState to 'actived' by default when it is not specified", assert=>{
            const tasklist = new TaskList({
                id: "etytdtgytf",
                name: "My list name",
                listState: ""
            });

            assert.equal(tasklist.listState, "actived", "listState is actived by default");
        });

        test("throws an error when listState is provided but not valid", assert => {
            assert.throws(()=>{
                new TaskList({id: "etytdtgytf", name: "My list name", listState: "in doing"});
            }, new Error("Task status should be actived, completed or pending"));
        });

        test("update task list to empty array by default when it is not specified", assert=>{
            const tasklist = new TaskList({
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived"
            });

            assert.equal(tasklist.list.length, 0, "tasklist is empty array");
        });

        test("throws an exception when task list is provided but not array", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: "my list"
            };

            assert.throws(()=>{
                new TaskList(props);
            }, new Error("task list should be an array"));
        });

        test("throws an exception when list elements are not instance of Task", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: ["my list"]
            };

            assert.throws(()=>{
                new TaskList(props);
            }, new Error("task list elements should be instance of Task"));
        });


    })

    QUnit.module('get name', () => {
        test("get name", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };
    
            var tasklist = new TaskList(props);
            assert.equal(tasklist.name, props.name, "get name");
        });
    })

    QUnit.module('get list state', () => {
        test("get list state", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };
    
            var tasklist = new TaskList(props);
            assert.equal(tasklist.listState, props.listState, "get listState");
        });
    });

    QUnit.module('get list state', () => {
        test("get list state", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };
    
            var tasklist = new TaskList(props);
            assert.equal(tasklist.listState, props.listState, "get listState");
        });
    });

    QUnit.module('sortListBydueDate()', () => {
        test("set listState", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" });
            var task2 = new Task({ id: "etytf", name: "task 2", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-19" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: [task1, task2]
            };

            tasklist = new TaskList(props);
            var sortList = [task2, task1];
    
            assert.deepEqual(tasklist.sortListBydueDate(props.list), sortList, "the list is sort by default by dueDate");
        });
    });

    QUnit.module('get list', () => {
        test("get list state", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" });

            var task2 = new Task({ id: "etytf", name: "task 2", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-19" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: [task1, task2]
            };
    
            var tasklist = new TaskList(props);
            assert.deepEqual(tasklist.list, [task2, task1], "get list");
        });
    });

    // Tests related to setters
    QUnit.module('set name', () => {
        test("throws an exception when new name is not valid string", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };

            tasklist = new TaskList(props);
            assert.throws(()=>{
                tasklist.name = 4;
            }, new Error("Tasklist name attribute should be string"));
        });

        test("set name", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };

            tasklist = new TaskList(props);
            tasklist.name = "new list name";
    
            assert.equal(tasklist.name, "new list name", "set name");
        });
    });

    QUnit.module('set listState', () => {
        test("throws an error when new listStata is provided but not valid", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };

            var tasklist = new TaskList(props);

            assert.throws(()=>{
                tasklist.listState = "normal";
            }, new Error("Task status should be actived, completed or pending"));
        });

        test("throws an error when new listStatus is completed but tasks aren't done", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: [task1]
            };

            var tasklist = new TaskList(props);

            assert.throws(()=>{
                tasklist.listState = "completed";
            }, new Error("before make this list completed, all tasks should be done"));
        });

        test("update 'actived' default value when new listState is not precise", assert => {
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };

            tasklist = new TaskList(props);
            tasklist.listState = "";
            assert.equal(tasklist.listState, "actived", "listState should be 'actived' by default");
        });

        test("set listState", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };

            tasklist = new TaskList(props);
            tasklist.listState = "pending";
    
            assert.equal(tasklist.listState, "pending", "set listState");
        });
    })

    QUnit.module('set list', () => {
        test("throws an exception when new list elements aren't instance of Task", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: [task1],
            };

            tasklist = new TaskList(props);
            assert.throws(()=>{
                tasklist.list = ["hello"];
            }, new Error("task list elements should be instance of Task"));
        });

        test("set name", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" });
            var task2 = new Task({ id: "etytfg", name: "task 2", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-19" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: [task1]
            };

            tasklist = new TaskList(props);
            tasklist.list = [task1, task2];
    
            assert.deepEqual(tasklist.list, [task2, task1], "set name");
        });
    });

    QUnit.module('addTask()', () => {
        test("throws an error when task is not instance of Task", assert=>{
            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };

            var tasklist = new TaskList(props);
            var task = "My task";

            assert.throws(()=>{
                tasklist.addTask(task);
            }, new Error("task list elements should be instance of Task"));
        });

        test("throws an error when new task already exists", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: [task1]
            };

            var tasklist = new TaskList(props);

            assert.throws(()=>{
                tasklist.addTask(task1);
            }, new Error("This task already exists"));
        });

        test("add new task to the list", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" });
            var task2 = new Task({ id: "etytfg", name: "task 2", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-19" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: [task1]
            };

            var tasklist = new TaskList(props);

            assert.deepEqual(tasklist.addTask(task2), [task2, task1], "set listState");
        });
        
    })

    QUnit.module('removeTaskById()', () => {
        test("throws an error when task with this id is not founded", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: []
            };

            var tasklist = new TaskList(props);
            tasklist.addTask(task1);

            assert.throws(()=>{
                tasklist.removeTaskById("nontrouve");
            }, new Error("task with this id is not founded"));
        });

        test("remove task when id is valid", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-20" });
            var task2 = new Task({ id: "etytfg", name: "task 2", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-19" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: [task1]
            };

            var tasklist = new TaskList(props);
            tasklist.addTask(task2);

            assert.deepEqual(tasklist.removeTaskById(task1.id), [task2], "remove task");
        });
    })


    // Tests à faire
    QUnit.module('sortListBypriority()', () => {
        test("sort taskList by priority", assert=>{
            var task1 = new Task({ id: "etytf", name: "task 1", description: "My task description", priority: "normal", status: "to do", dueDate: "2023-11-20" });
            var task2 = new Task({ id: "etytfg", name: "task 2", description: "My task description", priority: "high", status: "to do", dueDate: "2023-11-19" });

            var props = {
                id: "etytdtgytf",
                name: "My list name",
                listState: "actived",
                list: [task1, task2]
            };

            var tasklist = new TaskList(props);
            tasklist.sortListByPriority();

            assert.deepEqual(tasklist.removeTaskById(task1.id), [task2], "remove task");
        });
    })
});