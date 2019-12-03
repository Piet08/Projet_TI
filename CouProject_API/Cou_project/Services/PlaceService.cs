using System;
using Cou_project.DAO;
using Cou_project.Models;

namespace Cou_project.Services
{

    public interface ILieuService
    {
        Place CreatePlaceAndAddress(PlaceAndAddress place);
    }
    
    public class PlaceService : ILieuService
    {
        public Place CreatePlaceAndAddress(PlaceAndAddress place)
        {
            Address adr = AddressDAO.Create(place.Address);
               
            place.Place.IdAdr = adr.Id;
            return PlaceDAO.Create(place.Place);
            
        }
    }
}