using System;
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
    public class PlaceController : ControllerBase
    {
        private PlaceService _placeService = new PlaceService();
        
        [HttpGet]
        public ActionResult<IEnumerable<Place>> Query()
        {
            return Ok(PlaceDAO.Query());
        }
        
        [HttpGet("addresses")]
        public ActionResult<IEnumerable<PlaceAndAddress>> GetPlaceAndAddresses()
        {
            return Ok(_placeService.GetPlacesAndAddresses());
        }

        [Authorize]
        [HttpPost]
        public ActionResult<Place> Post([FromBody] Place place)
        {
            return Ok(PlaceDAO.Create(place));
        }
        

        [HttpGet("map")]
        public ActionResult<IEnumerable<Place>> QueryMap()
        {
            return Ok(_placeService.GetPlacesAndAddresses());
        }
        

        [Authorize]
        [HttpPost("forms")]
        public ActionResult<Place> Post([FromBody] PlaceAndAddress place)
        {
            return Ok(_placeService.CreatePlaceAndAddress(place));
        }

        [HttpGet("address/{id}")]
        public ActionResult<PlaceAndAddress> GetPlaceAndAddress(int id)
        {
            PlaceAndAddress placeAndAddress = _placeService.GetPlaceAndAddress(id);  
            return placeAndAddress != null ? (ActionResult<PlaceAndAddress>) Ok(placeAndAddress) : NotFound("This place does not exists !");
        }
        
        [HttpGet("{id}")]
        public ActionResult<Place> Get(int id)
        {
            Place place = PlaceDAO.Get(id);
            return place != null ? (ActionResult<Place>) Ok(place) : NotFound("This user does not exists!");
        }

        [Authorize]
        [HttpDelete("address/reviews/{id}")]
        public ActionResult DeleteWithCascade(int id)
        {
            string type = TokenModel.ReadClaimFromRequest(Request, "type");
            return type == "1" ? (ActionResult) Ok( _placeService.DeleteWithCascade(id)) : BadRequest("Vous n'êtes pas administrateur ! ");
        }
        
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            string type = TokenModel.ReadClaimFromRequest(Request, "type");
            return  type == "1" && PlaceDAO.Delete(id) ? (ActionResult) Ok() : BadRequest();
        }
        
        [Authorize]
        [HttpPut]
        public ActionResult<Place> Update([FromBody] Place place)
        {
            return PlaceDAO.Update(place) ? (ActionResult<Place>) Ok() : NotFound();
        }
    }
}