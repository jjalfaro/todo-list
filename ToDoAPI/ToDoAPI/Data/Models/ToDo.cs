﻿using System;
using System.Collections.Generic;

namespace ToDoAPI.Data.Models;

public partial class ToDo
{
    public int Id { get; set; }

    public string Description { get; set; } = null!;

    public DateTimeOffset DueDate { get; set; }

    public bool Done { get; set; }
}
