using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ReviewController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Review>> Query()
        {
            return Ok(ReviewDAO.Query());
        }

        [HttpGet("{id}")]
        public ActionResult<IEnumerable<Review>> GetAvisByLieu(int id)
        {
            IEnumerable<Review> aviss = ReviewDAO.GetAvisByPlace(id);
            return aviss != null
                ? (ActionResult<IEnumerable<Review>>) Ok(aviss)
                : NotFound("This lieu does not exists !");
        }
        
        [HttpPost]
        public ActionResult<Review> Post([FromBody] Review review)
        {
            return Ok(ReviewDAO.Create(review));
        }
        
//        [HttpGet("{id}")]
//        public ActionResult<Avis> Get(int id)
//        {
//            Avis avis = AvisDAO.Get(id);
//            return avis != null ? (ActionResult<Avis>) Ok(avis) : NotFound("This comment does not exists!");
//        }
        
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return ReviewDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        [HttpPut]
        public ActionResult<Review> Update([FromBody] Review review)
        {
            return ReviewDAO.Update(review) ? (ActionResult<Review>) Ok() : NotFound();
        }
    }
}