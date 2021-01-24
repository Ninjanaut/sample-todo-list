import { Task } from '../domain/Task';
import { TaskList } from '../domain/TaskList';
import { TaskStatus } from '../domain/TaskStatus';

test('Add valid task should success.', () => {

    // Arrange
    let taskList = new TaskList();
    let task = new Task("Foo", 10);

    // Act
    taskList.add(task);

    // Assert
    expect(taskList.tasks.length).toBe(1);

});

test('Add task with already existing name should return exception.', () => {

    // Arrange
    let taskList = new TaskList();
    let taskOne = new Task("Foo", 10);
    let taskTwo = new Task("Foo", 10);
    taskList.add(taskOne);

    // Act + Assert
    expect(() => { taskList.add(taskTwo) }).toThrow(Error);

});

test('Update task with valid input should succeed.', () => {

    // Arrange
    let taskList = new TaskList();
    let task = new Task("Foo", 10);
    taskList.add(task);
    let newName = "Bar";
    let newPriority = 20;
    let newStatus = TaskStatus.InProgress;

    // Act
    taskList.update(task.id, newName, newPriority, newStatus);

    // Assert
    let updatedTask = taskList.tasks.find(x => x.id == task.id);
    expect(updatedTask.name).toBe(newName);
    expect(updatedTask.priority).toBe(newPriority);
    expect(updatedTask.status).toBe(newStatus);
});

test('Update task with invalid id should throw exception.', () => {

    // Arrange
    let taskList = new TaskList();
    let task = new Task("Foo", 10);
    taskList.add(task);
  
    // Act + Assert
    expect(() => { taskList.update("", task.name, task.priority, task.status); }).toThrow(Error);
});

test('Delete task in completed state should succeed.', () => {

    // Arrange
    let taskList = new TaskList();
    let task = new Task("Foo", 10);
    task.update(task.name, task.priority, TaskStatus.Completed);
    taskList.add(task);

    // Act
    taskList.delete(task.id);

    // Assert
    expect(taskList.tasks.length).toBe(0);
});

test('Delete task in completed state should succeed.', () => {

    // Arrange
    let taskList = new TaskList();
    let task = new Task("Foo", 10);
    taskList.add(task);

    // Act + Assert
    expect(() => { taskList.delete(task.id); }).toThrow(Error);
});