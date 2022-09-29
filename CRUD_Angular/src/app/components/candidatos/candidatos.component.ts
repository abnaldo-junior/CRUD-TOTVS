import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { fromEventPattern } from 'rxjs';
import { Candidato } from 'src/app/Candidato';
import { CandidatosService } from 'src/app/candidatos.service';

@Component({
  selector: 'app-candidatos',
  templateUrl: './candidatos.component.html',
  styleUrls: ['./candidatos.component.css']
})
export class CandidatosComponent implements OnInit {

  formulario: any;
  tituloFormulario!: string;
  candidatos!: Candidato[];
  nomeCandidato!: string;
  candidatoId!: number;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef :BsModalRef;

  constructor( private CandidatosService : CandidatosService,
    private modalService : BsModalService) { }

  ngOnInit(): void {

    this.CandidatosService.PegarTodos().
    subscribe(resultado =>{ this.candidatos = resultado})
  }

  ExibirFormularioCadastro(): void{
    this.visibilidadeFormulario = true;
    this.visibilidadeTabela = false;
    this.tituloFormulario = 'Novo Candidato';
    this.formulario = new FormGroup({

      nome: new FormControl(null),
      sobrenome : new FormControl(null),
      idade: new FormControl(null),
      email:new FormControl(null),
      cpf: new FormControl(null),
      rg: new FormControl(null),
    })
  }

  ExibirFormularioAtualizcao(canididatoId):void{
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.CandidatosService.PegarPeloId(canididatoId).subscribe(resultado =>{
      this.tituloFormulario = `Atualizar ${resultado.nome} ${resultado.sobrenome}`;
      
      this.formulario = new FormGroup({

        candidatoId: new FormControl(resultado.candidatoId),
        nome: new FormControl(resultado.nome),
        sobrenome: new FormControl(resultado.sobrenome),
        idade: new FormControl(resultado.idade),
        email: new FormControl(resultado.email),
        cpf: new FormControl(resultado.cpf),
        rg: new FormControl(resultado.rg)
      });
    });
  }



  EnviarFormulario(): void {
    const candidato : Candidato = this.formulario.value;
    
    if(candidato.candidatoId >0){
      this.CandidatosService.AtualizarCandidato(candidato). subscribe(resultado =>{
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;     
        alert('Candidato atualizado com Sucesso');
        this.CandidatosService.PegarTodos().subscribe(registros =>{
          this.candidatos = registros;
        });
      });    
    } else {
      this.CandidatosService.SalvarCandidato(candidato).subscribe(resultado =>{
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;     
        alert('Candidato inserido com Sucesso');
        this.CandidatosService.PegarTodos().subscribe(registros =>{
          this.candidatos = registros;
        });
      });
    }
  }

  Voltar():void{
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(candidatoId, nome, conteudoModal: TemplateRef<any>): void{
    this.modalRef = this.modalService.show(conteudoModal);
    this.candidatoId = candidatoId;
    this.nomeCandidato = nome;
  }

  ExcluirCandidato(candidatoId)
  {
    this.CandidatosService.ExcluirCandidato(candidatoId).subscribe(resultado =>{
    this.modalRef.hide();
    alert('Candidato excluída com sucesso');
    this.CandidatosService.PegarTodos().subscribe(registros =>{
    this.candidatos = registros;
    });

    });
  }
}
