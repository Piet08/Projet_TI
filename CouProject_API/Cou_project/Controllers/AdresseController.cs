using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdresseController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Adresse>> query()
        {
            return Ok(AdresseDAO.Query());
        }
        [HttpPost]
        public ActionResult<Adresse> Post([FromBody] Adresse adr)
        {
            return Ok(AdresseDAO.Create(adr));
        }
        [HttpGet("{id}")]
        public ActionResult<Adresse> Get(int id)
        {
            Adresse util = AdresseDAO.Get(id);
            return util != null ? (ActionResult<Adresse>) Ok(util) : NotFound("This user does not exists!");
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return AdresseDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        [HttpPut]
        public ActionResult<Adresse> Update([FromBody] Adresse util)
        {
            return AdresseDAO.Update(util) ? (ActionResult<Adresse>) Ok() : NotFound();
        }
    }
    
}