using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class LieuController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Lieu>> query()
        {
            return Ok(LieuDAO.Query());
        }
        [HttpPost]
        public ActionResult<Lieu> Post([FromBody] Lieu lieu)
        {
            return Ok(LieuDAO.Create(lieu));
        }
        [HttpGet("{id}")]
        public ActionResult<Lieu> Get(int id)
        {
            Lieu lieu = LieuDAO.Get(id);
            return lieu != null ? (ActionResult<Lieu>) Ok(lieu) : NotFound("This user does not exists!");
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return LieuDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        [HttpPut]
        public ActionResult<Lieu> Update([FromBody] Lieu lieu)
        {
            return LieuDAO.Update(lieu) ? (ActionResult<Lieu>) Ok() : NotFound();
        }
    }
}