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
    public class UserController : ControllerBase
    {
        
        //AUTHENTIFICATION WITH JWT
        private IUserService _userService;
        
        
        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody]AuthenticateModel model)
        {
            var user = _userService.Authenticate(UserDAO.QueryAuth(model));
            if (user == null)
                return BadRequest(new {message = "Username or password is incorect"});
            
            return Ok(user);
        }
        
        /*[HttpGet("authenticate")]
        public IActionResult Get([FromBody] AuthenticateModel model)
        {
            User userConnected = _userService.Get(UserDAO.QueryAuth(model));
            return Ok(userConnected);
        }*/
        //UTILISATEUR
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<User>> Query()
        {
            
            return Ok(UserDAO.Query());
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult<User> Post([FromBody] UserAndAddress user)
        {
            return Ok(_userService.CreateUserAndAddress(user));
            //return Ok(UserDAO.Create(util));
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            User util = UserDAO.Get(id);
            return util != null ? (ActionResult<User>) Ok(util) : NotFound("This user does not exists!");
        }
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return UserDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        [AllowAnonymous]
        [HttpPut]
        public ActionResult<User> Update([FromBody] User util)
        {
            return UserDAO.Update(util) ? (ActionResult<User>) Ok() : NotFound();
        }
        
        
        //Favoris se trouve dans Utilisateur car les favoris sont plus lié à l'utilisateur que l'inverse --> Plus opti
        //FAVORIS
        
        //Le template est à ajouter dans l'url pour distinguer les requêtes'
        [AllowAnonymous]
        [HttpGet("Favoris")]
        public ActionResult<IEnumerable<Favorites>> queryFavoris()
        {
            return Ok(UserDAO.QueryFavoris());
        }
        [AllowAnonymous]
        [HttpPost("Favoris")]
        public ActionResult<Favorites> PostFavoris([FromBody] Favorites favorites)
        {
            return Ok(UserDAO.CreateFavoris(favorites));
        }
        [AllowAnonymous]
        [HttpDelete("Favoris")]
        public ActionResult DeleteFavoris([FromBody] Favorites favorites)
        {
            return UserDAO.DeleteFavoris(favorites) ? (ActionResult) Ok() : NotFound("This favorite item doesn't exists");
        }
    }
}