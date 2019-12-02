using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Cou_project.Services;
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
        
        [HttpPost]
        public ActionResult<Place> Post([FromBody] PlaceAndAddress place)
        {
//          return Ok(LieuDAO.Create(place));
            return Ok(_placeService.CreatePlaceAndAddress(place));
        }
        
        [HttpGet("{id}")]
        public ActionResult<Place> Get(int id)
        {
            Place place = PlaceDAO.Get(id);
            return place != null ? (ActionResult<Place>) Ok(place) : NotFound("This user does not exists!");
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return PlaceDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        [HttpPut]
        public ActionResult<Place> Update([FromBody] Place place)
        {
            return PlaceDAO.Update(place) ? (ActionResult<Place>) Ok() : NotFound();
        }
    }
}