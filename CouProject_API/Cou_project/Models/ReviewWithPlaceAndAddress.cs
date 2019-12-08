namespace Cou_project.Models
{
    public class ReviewWithPlaceAndAddress
    {
        public Review Review { get; set; }
        public PlaceAndAddress PlaceAndAddress { get; set; }

        public ReviewWithPlaceAndAddress(Review review, PlaceAndAddress placeAndAddress)
        {
            Review = review;
            PlaceAndAddress = placeAndAddress;
        }
        
    }
}