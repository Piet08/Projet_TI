using System;
using System.Collections;
using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Cou_project.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.Controllers
{
    [ApiController]
    [Route("/api/[controller]")]
    public class ReviewController : ControllerBase
    {
        private ReviewService _reviewService = new ReviewService();
            
        [HttpGet]
        public ActionResult<IEnumerable<Review>> Query()
        {
            return Ok(ReviewDAO.Query());
        }

        [HttpGet("place/address/{id}")]
        public ActionResult<ReviewWithPlaceAndAddress> GetReviewWithPlaceAndAddress(int id)
        {
            return Ok(_reviewService.GetReviewWithPlaceAndAddress(id));
        }
        
        [HttpGet("place/address/user/all/{idUser}")]
        public ActionResult<ReviewWithPlaceAndAddress> GetReviewsWithPlaceAndAddressFromAnUser(int idUser)
        {
            return Ok(_reviewService.GetReviewsWithPlaceAndAddresses(idUser));
        }
        
        [HttpGet("user/{id}")]
        public ActionResult<ReviewAndUser> GetReviewAndUser(int id)
        {
            ReviewAndUser reviewAndUser = _reviewService.GetReviewAndUser(id);
            return reviewAndUser != null ? (ActionResult<ReviewAndUser>) Ok(reviewAndUser) : NotFound("Review not found");
        }

        [HttpGet("user/all/{id}")]
        public ActionResult<IEnumerable<Review>> GetReviewsFromUser(int id)
        {
            IEnumerable<Review> reviewsByUser = ReviewDAO.GetReviewsByUser(id);
            return reviewsByUser != null
                ? (ActionResult<IEnumerable<Review>>) Ok(reviewsByUser)
                : NotFound("User not found");
        }

        [HttpGet("users/place/{id}")]
        public ActionResult<IEnumerable<ReviewAndUser>> GetReviewAndUserByPlace(int id)
        {
            return Ok(_reviewService.GetReviewAndUserByPlace(id));
        }
        
        [HttpGet("place/{id}")]
        public ActionResult<IEnumerable<Review>> GetReviewByPlace(int id)
        {
            IEnumerable<Review> reviews = ReviewDAO.GetReviewByPlace(id);
            return reviews != null
                ? (ActionResult<IEnumerable<Review>>) Ok(reviews)
                : NotFound("This lieu does not exists !");
        }
        
        [Authorize]
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