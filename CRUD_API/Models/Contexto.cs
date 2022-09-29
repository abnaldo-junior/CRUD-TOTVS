using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CRUD_API.Models
{
    public class Contexto :DbContext
    {    
        public DbSet<Candidato> Candidatos { get; set; }

        public Contexto(DbContextOptions<Contexto> opcoes): base(opcoes)
        {

            
        }
    }
}