using ItemsApp.DataContext;
using MovieApp.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemsApp.Services
{
    public interface IItemsService
    {
        Result<List<Items>> GetItems();
        Result<Items> AddItem(Items item);
        void DeleteItem(int id);
        Result<Items> UpdateItem(Items item, int id);
    }
}
