using System;

namespace Domain
{
    public class Task
    {
        public Guid Id { get; private set; }

        public string Name { get; private set; }

        // Higher number has higher priority.
        public int Priority { get; private set; }

        public TaskStatus Status { get; private set; }

        public Task(string name, int priority)
        {
            ValidateThatNameIsNotNull(name);

            Id = Guid.NewGuid();

            Name = name;

            Priority = priority;

            Status = TaskStatus.NotStarted;
        }

        private static void ValidateThatNameIsNotNull(string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                throw new ArgumentException("Every task must have a name.");
            }
        }

        public void Update(string name, int priority, TaskStatus status)
        {
            ValidateThatNameIsNotNull(name);

            Name = name;
            Priority = priority;
            Status = status;
        }
    }
}
