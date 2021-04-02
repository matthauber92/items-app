using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ItemsApp.DataContext
{
    public class ItemsDbContext : DbContext
    {
        public ItemsDbContext(DbContextOptions<ItemsDbContext> options) : base(options)
        {

        }

        public DbSet<Items> Items { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=tcp:matt-hauber.database.windows.net,1433;Initial Catalog=ItemsDB;Persist Security Info=False;User ID=matthauber92;Password=Keeper*98;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            base.OnConfiguring(optionsBuilder);
        }
    }
}
