using System;
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
                return BadRequest(new {message = "Username or password is incorrect"});
            
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
        [HttpPost("simple")]
        public ActionResult<User> Post([FromBody] User user)
        {
            return Ok(UserDAO.Create(user));
        }

        [AllowAnonymous]
        [HttpPost]
        public ActionResult<User> PostUserAndAddress([FromBody] UserAndAddress user)
        {
            return Ok(_userService.CreateUserAndAddress(user));
        }
        
        [AllowAnonymous]
        [HttpGet("address/all")]
        public ActionResult<IEnumerable<UserAndAddress>> GetAllUsersWithAddress()
        {
            return Ok(_userService.GetUsersWithAddress());
        }
        
        [AllowAnonymous]
        [HttpGet("{id}")]
        public ActionResult<User> Get(int id)
        {
            User util = _userService.Get(id);
            return util != null ? (ActionResult<User>) Ok(util) : NotFound("This user does not exists!");
        }

        [AllowAnonymous]
        [HttpGet("address/{id}")]
        public ActionResult<UserAndAddress> GetWithAddress(int id)
        {
            UserAndAddress user = _userService.GetUserWithAddress(id);
            return user != null ? (ActionResult<UserAndAddress>) Ok(user) : NotFound("This user does not exists !");
        }
        
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return UserDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }

        [HttpPut]
        public ActionResult<User> Update([FromBody] User util)
        {
            return UserDAO.Update(util) ? (ActionResult<User>) Ok() : NotFound();
        }

        [AllowAnonymous]
        [HttpGet("favoris")]
        public ActionResult<IEnumerable<Favorites>> queryFavoris()
        {
            return Ok(UserDAO.QueryFavoris());
        }
        [AllowAnonymous]
        [HttpPost("favoris")]
        public ActionResult<Favorites> PostFavoris([FromBody] Favorites favorites)
        {
            return Ok(UserDAO.CreateFavoris(favorites));
        }
        [AllowAnonymous]
        [HttpDelete("favoris")]
        public ActionResult DeleteFavoris([FromBody] Favorites favorites)
        {
            return UserDAO.DeleteFavoris(favorites) ? (ActionResult) Ok() : NotFound("This favorite item doesn't exists");
        }
    }
}