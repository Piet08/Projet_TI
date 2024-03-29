﻿using System.Collections.Generic;
using Cou_project.DAO;
using Cou_project.Models;
using Microsoft.AspNetCore.Authorization;
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
            //return Ok(AddressDAO.Create(adr));
            Address found = AddressDAO.Create(adr);
            return found != null ?  (ActionResult<Address>) Ok(found) : NotFound("This address is already exist");
        }
        [HttpGet("{id}")]
        public ActionResult<Address> Get(int id)
        {
            Address util = AddressDAO.Get(id);
            return util != null ? (ActionResult<Address>) Ok(util) : NotFound("This user does not exists!");
        }
        
        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            return AddressDAO.Delete(id) ? (ActionResult) Ok() : NotFound();
        }
        
        [Authorize]
        [HttpPut]
        public ActionResult<Address> Update([FromBody] Address util)
        {
            return AddressDAO.Update(util) ? (ActionResult<Address>) Ok() : NotFound();
        }
    }
    
}