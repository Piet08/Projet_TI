using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class UtilisateurController : ControllerBase
    {
        //UTILISATEUR
        [HttpGet]
        public ActionResult<IEnumerable<Utilisateur>> query()
        {
            return Ok(UtilisateurDAO.Query());
        }
        [HttpPost]
        public ActionResult<Utilisateur> Post([FromBody] Utilisateur util)
        {
            return Ok(UtilisateurDAO.Create(util));
        }
        [HttpGet("{id}")]
        public ActionResult<Utilisateur> Get(int id)
        {
            Utilisateur util = UtilisateurDAO.Get(id);
            return util != null ? (ActionResult<Utilisateur>) Ok(util) : NotFound("This user does not exists!");
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return UtilisateurDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        [HttpPut]
        public ActionResult<Utilisateur> Update([FromBody] Utilisateur util)
        {
            return UtilisateurDAO.Update(util) ? (ActionResult<Utilisateur>) Ok() : NotFound();
        }
        
        
        //Favoris se trouve dans Utilisateur car les favoris sont plus lié à l'utilisateur que l'inverse --> Plus opti
        //FAVORIS
        [HttpGet("Favoris")]
        public ActionResult<IEnumerable<Favoris>> queryFavoris()
        {
            return Ok(UtilisateurDAO.QueryFavoris());
        }
        [HttpPost("Favoris")]
        public ActionResult<Favoris> PostFavoris([FromBody] Favoris favoris)
        {
            return Ok(UtilisateurDAO.CreateFavoris(favoris));
        }
        [HttpDelete("Favoris")]
        public ActionResult DeleteFavoris([FromBody] Favoris favoris)
        {
            return UtilisateurDAO.DeleteFavoris(favoris) ? (ActionResult) Ok() : NotFound("This favorite item doesn't exists");
        }
    }
}