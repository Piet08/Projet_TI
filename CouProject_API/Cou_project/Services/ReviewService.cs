using Cou_project.DAO;
using Cou_project.Models;

namespace Cou_project.Services
{
    public interface IReviewService
    {
        ReviewAndUser getReviewAndUser(int ind);
    }
    public class ReviewService : IReviewService
    {
        public ReviewAndUser getReviewAndUser(int idReview)
        {
            Review review = ReviewDAO.Get(idReview);
            return new ReviewAndUser(review,UserDAO.Get(review.IdUser));
        }
    }
}