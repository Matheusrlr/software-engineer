import { Component, OnInit } from '@angular/core';
import { Projetos } from './projeto';
import { ProjetoService } from '../projeto.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css']
})
export class ProjetosComponent implements OnInit {

  projetos: Projetos[];
  projetoSelecionado: Projetos;
  projetoNovo: Projetos;


  constructor(private projetoService: ProjetoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadProjetos();
  }
  editar(projeto: Projetos, content): void {

    this.projetoSelecionado = projeto;

    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-projeto'})
      .result.then((projetoForm: NgForm) => {
        this.projetoSelecionado.projeto = projetoForm.value.projeto;
        console.log(this.projetoSelecionado);
        this.salvar(this.projetoSelecionado);
    });
  }
  loadProjetos(): void {
    this.projetoService.getProjeto().subscribe(
      projetos => this.projetos = projetos
    );
  }

  selecionarProjeto(projeto: Projetos): void {
    this.projetoSelecionado = projeto;
  }

  salvar(projeto: Projetos): void {
    this.projetoService.atualizarProjeto(projeto).subscribe();
  }

  apagar(projeto: Projetos): void {
    this.projetoService.apagarProjeto(projeto).subscribe();
    this.projetos = this.projetos.filter(a => a !== projeto);
  }

  adicionar(content): void {
    this.projetoNovo = new Projetos();

    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-projeto'})
      .result.then((projetoFormAdidionar: NgForm) => {
      this.salvarNovoProjeto(this.projetoNovo);
      this.projetos.push(this.projetoNovo);
    });
  }

  cancelar(): void {
    this.projetoNovo = null;
  }

  salvarNovoProjeto(projeto: Projetos): void {
    this.projetoService.adicionar(projeto).subscribe();
}
}
