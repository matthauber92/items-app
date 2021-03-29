using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ItemsApp.DataContext;
using ItemsApp.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ItemsApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : BaseController<ItemsController, IItemsService>
    {
        public ItemsController(IItemsService service) : base(service)
        {

        }

        [HttpGet]
        [Route("GetItems")]
        public ActionResult<List<Items>> GetItems()
        {
            var result = _service.GetItems();

            if(result.HasValue)
            {
                return result.Value;
            }
            else
            {
                return null;
            }
        }

        [HttpPost]
        [Route("AddItem")]
        public ActionResult<Items> AddItem([FromBody] Items item)
        {
            var result = _service.AddItem(item);

            if (result.HasValue)
            {
                return result.Value;
            }
            else
            {
                return null;
            }
        }

        [HttpDelete("{id}")]
        [Route("DeleteItem")]
        public void DeleteItem(int id)
        {
            _service.DeleteItem(id);
        }

        [HttpPut]
        [Route("UpdateItem")]
        public ActionResult<Items> UpdateItem(int id, [FromBody] Items item)
        {
            var result = _service.UpdateItem(item, id);

            if (result.HasValue)
            {
                return result.Value;
            }
            else
            {
                return null;
            }
        }
    }
}