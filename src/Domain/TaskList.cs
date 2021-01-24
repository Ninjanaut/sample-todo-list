using System;
using System.Collections.Generic;
using System.Linq;

namespace Domain
{
    public class TaskList
    {
        private List<Task> _tasks = new List<Task>();
        public IReadOnlyCollection<Task> Tasks => _tasks.AsReadOnly();

        private Task FindById(Guid id)
        {
            return _tasks.Find(x => x.Id == id);
        }

        public void Add(Task task)
        {
            ValidateThatWeDontHaveTwoTasksWithTheSameName(task.Name);
            _tasks.Add(task);
        }

        public void Update(Guid taskId, string name, int priority, TaskStatus status)
        {
            var task = FindById(taskId);

            if (task == null)
            {
                throw new ArgumentException("Task id is not valid.");
            }

            if (task.Name != name)
            {
                ValidateThatWeDontHaveTwoTasksWithTheSameName(name);
            }

            task.Update(name, priority, status);
        }

        public void Delete(Guid taskId)
        {
            var task = FindById(taskId);

            if (task == null)
            {
                throw new ArgumentException("Task id is not valid.");
            }

            if (task.Status != TaskStatus.Completed)
            {
                throw new InvalidOperationException("Only completed task can be deleted.");
            }

            _tasks.Remove(task);
        }

        private void ValidateThatWeDontHaveTwoTasksWithTheSameName(string name)
        {
            bool doesTaskCollectionContainsName = _tasks.Any(x => x.Name == name);

            if (doesTaskCollectionContainsName)
            {
                throw new InvalidOperationException("Task list already contains a task with the provided name.");
            }
        }
    }
}
