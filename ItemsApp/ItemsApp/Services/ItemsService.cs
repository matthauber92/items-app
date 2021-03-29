using ItemsApp.DataContext;
using ItemsApp.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemsApp.Services
{
    public class ItemsService : BaseService, IItemsService
    {
        public ItemsService(ItemsDbContext db) : base(db)
        {

        }

        public Result<List<Items>> GetItems()
        {
            Result<List<Items>> result = new Result<List<Items>>();
            result.Value = _db.Items.ToList();

            return result;
        }

        public Result<Items> AddItem(Items item)
        {
            Result<Items> result = new Result<Items>();
            try
            {
                Items model = new Items();
                using (var transaction = _db.Database.BeginTransaction())
                {
                    _db.Items.Add(item);
                    _db.SaveChanges();
                    transaction.Commit();
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex;
            }

            return result;
        }

        public void DeleteItem(int id)
        {
            using (var transaction = _db.Database.BeginTransaction())
            {
                var item = _db.Items.FirstOrDefault(i => i.Id == id);
                _db.Remove(item);
                _db.SaveChanges();

                transaction.Commit();
            }
        }

        public Result<Items> UpdateItem(Items item, int id)
        {
            Result<Items> result = new Result<Items>();
            try
            {
                Items model = new Items();
                model.ItemName = item.ItemName;
                model.Cost = item.Cost;

                using (var transaction = _db.Database.BeginTransaction())
                {
                    var itemToUpdate = _db.Items.Where(x => x.Id == id).FirstOrDefault();
                    itemToUpdate.ItemName = model.ItemName;
                    itemToUpdate.Cost = model.Cost;
                    _db.Update(itemToUpdate);
                    _db.SaveChanges();

                    transaction.Commit();
                }
            }
            catch (Exception ex)
            {
                result.Exception = ex;
            }

            return result;
        }
    }
}
