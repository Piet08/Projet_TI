using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Microsoft.AspNetCore.Mvc;

namespace Cou_project.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AddressController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Address>> Query()
        {
            return Ok(AddressDAO.Query());
        }
        [HttpPost]
        public ActionResult<Address> Post([FromBody] Address adr)
        {
            return Ok(AddressDAO.Create(adr));
        }
        [HttpGet("{id}")]
        public ActionResult<Address> Get(int id)
        {
            Address util = AddressDAO.Get(id);
            return util != null ? (ActionResult<Address>) Ok(util) : NotFound("This user does not exists!");
        }
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return AddressDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        [HttpPut]
        public ActionResult<Address> Update([FromBody] Address util)
        {
            return AddressDAO.Update(util) ? (ActionResult<Address>) Ok() : NotFound();
        }
    }
    
}