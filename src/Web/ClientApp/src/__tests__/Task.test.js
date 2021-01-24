import { Task } from '../domain/Task';
import { TaskStatus } from '../domain/TaskStatus';

test('Constructor with valid input should succeed.', () => {

    // Arrange
    let name = "Foo";
    let priority = 10;

    // Act
    let task = new Task(name, priority);

    // Assert
    expect(task.name).toBe(name);
    expect(task.priority).toBe(priority);
    expect(task.status).toBe(TaskStatus.NotStarted);

});

test('Constructor with empty name should return exception.', () => {

    // Arrange + Act + Assert
    expect(() => { new Task("", 10) }).toThrow();

});

test('Update with valid input should succeed.', () => {

    // Arrange
    let name = "Foo";
    let priority = 10;
    let task = new Task(name, priority);
    let newName = "Bar";
    let newStatus = TaskStatus.InProgress;

    // Act
    task.update(newName, priority, newStatus);

    // Assert
    expect(task.name).toBe(newName);
    expect(task.priority).toBe(priority);
    expect(task.status).toBe(newStatus);

});

test('Update with empty name should return exception.', () => {

    // Arrange
    let task = new Task("Foo", 10);

    //Act + Assert
    expect(() => { task.update("", task.priority, task.status) }).toThrow();

});