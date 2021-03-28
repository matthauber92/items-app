using ItemsApp.DataContext;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemsApp.Services
{
    public class BaseService
    {
        public ItemsDbContext _db;
        public IHttpContextAccessor _context;

        protected BaseService(ItemsDbContext db)
        {
            _db = db;
        }
    }
}
