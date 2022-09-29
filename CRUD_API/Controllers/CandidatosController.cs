using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CRUD_API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD_API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class CandidatosController : ControllerBase
  {
    private readonly Contexto _contexto;

    public CandidatosController(Contexto contexto)
    {
      _contexto = contexto;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Candidato>>> PegarTodosAsync()
    {
      return await _contexto.Candidatos.ToListAsync();
    }

    [HttpGet("{CandidatoId}")]
    public async Task<ActionResult<Candidato>> PegarCandidatoPeloIdAsync(int candidatoId)
    {

      Candidato candidato = await _contexto.Candidatos.FindAsync(candidatoId);

      if (candidato == null)
        return NotFound();

      return candidato;
    }

    [HttpPost]
    public async Task<ActionResult<Candidato>> SalvarCandidatoAsync(Candidato candidato)
    {
      await _contexto.Candidatos.AddAsync(candidato);
      await _contexto.SaveChangesAsync();

      return Ok();
    }

    [HttpPut]
    public async Task<ActionResult> AtualizarCandidatoAsync(Candidato candidato)
    {
      _contexto.Candidatos.Update(candidato);
      await _contexto.SaveChangesAsync();

      return Ok();
    }

    [HttpDelete("{candidatoId}")]
    public async Task<ActionResult> ExcluirCandidatoAsync(int candidatoId)
    {
      Candidato candidato = await _contexto.Candidatos.FindAsync(candidatoId);

      _contexto.Remove(candidato);

      await _contexto.SaveChangesAsync();

      return Ok();
    }

  }
}