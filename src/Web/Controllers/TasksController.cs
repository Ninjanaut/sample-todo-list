using Domain;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Web.Controllers
{
    // REST API http methods overview
    // https://www.restapitutorial.com/lessons/httpmethods.html

    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : Controller
    {
        private TaskList _tasklist;
        public TasksController(TaskList tasklist)
        {
            _tasklist = tasklist;
        }
        [HttpGet]
        public IEnumerable<Domain.Task> Get()
        {
            return _tasklist.Tasks;
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Domain.Task>> Get(Guid id)
        {
            if (FindTaskById(id) == null)
            {
                return NotFound();
            }
            return Ok(_tasklist.Tasks.Where(x => x.Id == id));
        }

        [HttpPost]
        public ActionResult<Domain.Task> Post(string name, int priority)
        {
            try
            {
                var task = new Domain.Task(name, priority);
                _tasklist.Add(task);
                return Ok(task);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete("{id}")]
        public ActionResult Delete(Guid id)
        {
            if (FindTaskById(id) == null)
            {
                return NotFound();
            }
            try
            {
                _tasklist.Delete(id);
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("{id}")]
        public ActionResult<Domain.Task> Put(Guid id, string name, int priority, TaskStatus status)
        {
            if (FindTaskById(id) == null)
            {
                return NotFound();
            }
            try
            {
                _tasklist.Update(id, name, priority, status);
                return Ok(_tasklist.Tasks.Where(x => x.Id == id).Single());
            } 
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private Domain.Task FindTaskById(Guid id)
        {
            return _tasklist.Tasks.Where(x => x.Id == id).SingleOrDefault();
        }
    }
}
