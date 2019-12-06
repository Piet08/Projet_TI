using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Cou_project.DAO;
using Cou_project.Models;

namespace Cou_project.Services
{
    public interface IReviewService
    {
        ReviewAndUser GetReviewAndUser(int ind);
    }
    public class ReviewService : IReviewService
    {
        public ReviewAndUser GetReviewAndUser(int idReview)
        {
            Review review = ReviewDAO.Get(idReview);
            return new ReviewAndUser(review,UserDAO.Get(review.IdUser));
        }

        public IEnumerable<ReviewAndUser> GetReviewAndUserByPlace(int idPlace)
        {
            IEnumerable<Review> reviews = ReviewDAO.GetReviewByPlace(idPlace);
            ReviewAndUser[] reviewAndUsers = new ReviewAndUser[reviews.Count()];
            int i = 0;
            foreach (var review in reviews)
            {
                reviewAndUsers[i] = GetReviewAndUser(review.Id);
                i++;
            }
            return reviewAndUsers;
        }
    }
}