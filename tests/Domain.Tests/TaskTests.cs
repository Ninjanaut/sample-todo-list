using System;
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

    public class TaskTests
    {
        [Fact]
        public void Constructor_HasValidInput_ParametersAssigned()
        {
            // Arrange
            var name = "Foo";
            int priority = 1;

            // Act
            var task = new Task(name, priority);

            // Assert
            Assert.Equal(name, task.Name);
            Assert.Equal(priority, task.Priority);
            Assert.Equal(TaskStatus.NotStarted, task.Status);
        }

        [Fact]
        public void Constructor_MissingName_ThrowException()
        {
            // Arrange + Act + Assert
            Assert.Throws<ArgumentException>(()
                => new Task(name: null, priority: 1));
        }

        [Fact]
        public void Update_WithValidInput_Success()
        {
            // Arrange
            var task = new Task(name: "Foo", priority: 1);
            var name = "Bar";
            var priority = 2;
            var status = TaskStatus.InProgress;

            // Act
            task.Update(name, priority, status);

            // Assert
            Assert.Equal(name, task.Name);
            Assert.Equal(priority, task.Priority);
            Assert.Equal(status, task.Status);
        }

        [Fact]
        public void Update_WithMissingName_ThrowException()
        {
            // Arrange
            var task = new Task(name: "Foo", priority: 1);

            // Act + Assert
            Assert.Throws<ArgumentException>(()
                => task.Update(name: null, task.Priority, task.Status));
        }
    }
}
