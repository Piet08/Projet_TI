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
        public PlaceService PlaceService = new PlaceService();
        
        public ReviewAndUser GetReviewAndUser(int idReview)
        {
            Review review = ReviewDAO.Get(idReview);
            return new ReviewAndUser(review,UserDAO.Get(review.IdUser));
        }
        
        public ReviewWithPlaceAndAddress GetReviewWithPlaceAndAddress(int id)
        {
            Review review = ReviewDAO.Get(id);
            return new ReviewWithPlaceAndAddress(review,PlaceService.GetPlaceAndAddress(review.IdPlace));
        }

        public IEnumerable<ReviewWithPlaceAndAddress> GetReviewsWithPlaceAndAddresses(int id)
        {
            IEnumerable<Review> reviews = ReviewDAO.GetReviewsByUser(id);
            ReviewWithPlaceAndAddress[] reviewWithPlaceAndAddresses = new ReviewWithPlaceAndAddress[reviews.Count()];
            int i = 0;
            foreach (var review in reviews)
            {
                reviewWithPlaceAndAddresses[i] = GetReviewWithPlaceAndAddress(review.Id);
                i++;
            }
            return reviewWithPlaceAndAddresses;
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