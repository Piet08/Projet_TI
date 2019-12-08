using System;
using System.Collections.Generic;
using System.Linq;
using Cou_project.DAO;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.Services
{

    public interface ILieuService
    {
        Place CreatePlaceAndAddress(PlaceAndAddress place);
        PlaceAndAddress GetPlaceAndAddress(int id);
    }
    
    public class PlaceService : ILieuService
    {
        public Place CreatePlaceAndAddress(PlaceAndAddress place)
        {
            Address adr = AddressDAO.Create(place.Address);
               
            place.Place.IdAdr = adr.Id;
            return PlaceDAO.Create(place.Place);
            
        }
        public PlaceAndAddress GetPlaceAndAddress(int id)
        {
            Place place = PlaceDAO.Get(id);
            return new PlaceAndAddress(place, AddressDAO.Get(place.IdAdr),PlaceDAO.GetAvgRate(id));
        }

        public IEnumerable<PlaceAndAddress> GetPlacesAndAddresses()
        {
            IEnumerable<Place> places = PlaceDAO.Query();
            PlaceAndAddress[] placeAndAddresses = new PlaceAndAddress[places.Count()];
            int i = 0;
            foreach (var place in places)
            {
                placeAndAddresses[i] = new PlaceAndAddress(place,AddressDAO.Get(place.IdAdr),PlaceDAO.GetAvgRate(place.Id));
                i++;
            }

            return placeAndAddresses;
        }
        
        //En attendant de la résolution de la contrainte on delete cascade en bdd
        public bool DeleteWithCascade(int id)
        {
            if (!AddressDAO.Delete(PlaceDAO.Get(id).IdAdr))
                return false;
            
            if (!ReviewDAO.DeleteByPlace(id))
                return false;
            
            return PlaceDAO.Delete(id);
        }
    }
}