using System;
using System.Linq;
using Xunit;

namespace Domain.Tests
{
    // Naming convention
    // https://docs.microsoft.com/en-us/dotnet/core/testing/unit-testing-best-practices#best-practices
    // For complex class use nested class for each method
    // https://haacked.com/archive/2012/01/02/structuring-unit-tests.aspx/

    /* Naming convention for method names
     * The name of the method being tested.
     * The scenario under which it's being tested.
     * The expected behavior when the scenario is invoked.
     */

    public class TaskListTests
    {
        [Fact]
        public void Add_WithValidInput_Success()
        {
            // Arrange
            var tasklist = new TaskList();
            var task = new Task(name: "Foo", priority: 1);

            // Act
            tasklist.Add(task);

            // Assert
            Assert.Contains(expected: task, collection: tasklist.Tasks);
        }

        [Fact]
        public void Add_TwoTasksWithSameName_ThrowException()
        {
            // Arrange
            var tasklist = new TaskList();
            var taskOne = new Task(name: "Foo", priority: 1);
            var taskTwo = new Task(name: "Foo", priority: 2);

            // Act + Assert
            tasklist.Add(taskOne);
            Assert.Throws<InvalidOperationException>(()
                => tasklist.Add(taskTwo));
        }

        [Fact]
        public void Delete_TaskWithStatusNotStarted_ThrowException()
        {
            // Arrange
            var tasklist = new TaskList();
            var task = new Task(name: "Foo", priority: 1);
            tasklist.Add(task);

            // Act + Assert
            Assert.Throws<InvalidOperationException>(() 
                => tasklist.Delete(task.Id));
        }

        [Fact]
        public void Delete_TaskWithStatusCompleted_Success()
        {
            // Arrange
            var tasklist = new TaskList();
            var task = new Task(name: "Foo", priority: 1);
            task.Update(task.Name, task.Priority, TaskStatus.Completed);
            tasklist.Add(task);

            // Act
            tasklist.Delete(task.Id);

            // Assert
            Assert.Equal(0, tasklist.Tasks.Count);
        }

        [Fact]
        public void Update_WithValidInput_Success()
        {
            // Arrange
            var tasklist = new TaskList();
            var task = new Task(name: "Foo", priority: 1);
            tasklist.Add(task);
            var name = "Bar";
            var priority = 2;
            var status = TaskStatus.Completed;

            // Act
            tasklist.Update(task.Id, name, priority, status);

            // Assert
            Assert.Equal(name, tasklist.Tasks.ElementAt(0).Name);
            Assert.Equal(priority, tasklist.Tasks.ElementAt(0).Priority);
            Assert.Equal(status, tasklist.Tasks.ElementAt(0).Status);
        }

        [Fact]
        public void Update_WithAlreadyExistingName_ThrowException()
        {
            // Arrange
            var tasklist = new TaskList();
            var taskOne = new Task(name: "Foo", priority: 1);
            var taskTwo = new Task(name: "Bar", priority: 1);
            tasklist.Add(taskOne);
            tasklist.Add(taskTwo);

            // Act + Assert
            Assert.Throws<InvalidOperationException>(()
                => tasklist.Update(taskTwo.Id, taskOne.Name, taskTwo.Priority, taskTwo.Status));
        }
    }
}
