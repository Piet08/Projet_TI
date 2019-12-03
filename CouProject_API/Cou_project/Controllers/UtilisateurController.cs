using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Cou_project.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.Controllers
{
    [Authorize]
    [ApiController]
    [Route("/api/[controller]")]
    public class UtilisateurController : ControllerBase
    {
        
        //AUTHENTIFICATION WITH JWT
        private IUtilisateurService _utilisateurService;
        
        
        public UtilisateurController(IUtilisateurService userService)
        {
            _utilisateurService = userService;
        }
        
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            return Ok(_utilisateurService.Authenticate(UtilisateurDAO.QueryAuth(model)));
        }
        /*[HttpGet("authenticate")]
        public IActionResult GetAll()
        {
            var users = _utilisateurService.GetAll();
            return Ok(users);
        }*/
        //UTILISATEUR
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Utilisateur>> query()
        {
            return Ok(UtilisateurDAO.Query());
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult<Utilisateur> Post([FromBody] Utilisateur util)
        {
            return Ok(UtilisateurDAO.Create(util));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<Utilisateur> Get(int id)
        {
            Utilisateur util = UtilisateurDAO.Get(id);
            return util != null ? (ActionResult<Utilisateur>) Ok(util) : NotFound("This user does not exists!");
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return UtilisateurDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        [AllowAnonymous]
        [HttpPut]
        public ActionResult<Utilisateur> Update([FromBody] Utilisateur util)
        {
            return UtilisateurDAO.Update(util) ? (ActionResult<Utilisateur>) Ok() : NotFound();
        }
        
        
        //Favoris se trouve dans Utilisateur car les favoris sont plus lié à l'utilisateur que l'inverse --> Plus opti
        //FAVORIS
        
        //Le template est à ajouter dans l'url pour distinguer les requêtes'
        [AllowAnonymous]
        [HttpGet("Favoris")]
        public ActionResult<IEnumerable<Favoris>> queryFavoris()
        {
            return Ok(UtilisateurDAO.QueryFavoris());
        }
        [AllowAnonymous]
        [HttpPost("Favoris")]
        public ActionResult<Favoris> PostFavoris([FromBody] Favoris favoris)
        {
            return Ok(UtilisateurDAO.CreateFavoris(favoris));
        }
        [AllowAnonymous]
        [HttpDelete("Favoris")]
        public ActionResult DeleteFavoris([FromBody] Favoris favoris)
        {
            return UtilisateurDAO.DeleteFavoris(favoris) ? (ActionResult) Ok() : NotFound("This favorite item doesn't exists");
        }
    }
}