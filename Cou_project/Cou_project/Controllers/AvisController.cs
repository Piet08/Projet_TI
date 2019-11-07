using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class AvisController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Avis>> query()
        {
            return Ok(AvisDAO.Query());
        }
        [HttpPost]
        public ActionResult<Avis> Post([FromBody] Avis avis)
        {
            return Ok(AvisDAO.Create(avis));
        }
        [HttpGet("{id}")]
        public ActionResult<Avis> Get(int id)
        {
            Avis avis = AvisDAO.Get(id);
            return avis != null ? (ActionResult<Avis>) Ok(avis) : NotFound("This comment does not exists!");
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return AvisDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        [HttpPut]
        public ActionResult<Avis> Update([FromBody] Avis avis)
        {
            return AvisDAO.Update(avis) ? (ActionResult<Avis>) Ok() : NotFound();
        }
    }
}