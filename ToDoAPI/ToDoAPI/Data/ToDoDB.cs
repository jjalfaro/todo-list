using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using ToDoAPI.Data.Models;

namespace ToDoAPI.Data;

public partial class ToDoDB : DbContext
{
    public ToDoDB()
    {
    }

    public ToDoDB(DbContextOptions<ToDoDB> options)
        : base(options)
    {
    }

    public virtual DbSet<ToDo> ToDo { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=ToDoDB");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ToDo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK_ToDos");
            entity.Property(e => e.Description).HasMaxLength(250);
            entity.Property(e => e.Done).HasDefaultValue(false);

        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
