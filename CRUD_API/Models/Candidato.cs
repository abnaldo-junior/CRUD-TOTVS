namespace CRUD_API.Models
{
    public class Candidato
    {
        public int CandidatoId { get; set; }

        public string Nome { get; set; }

        public string Sobrenome { get; set; }

        public int Idade { get; set; }

        public string Email { get; set; }
        
        public string CPF { get; set; }  
        
        public string RG { get; set; }    
    }        
}
