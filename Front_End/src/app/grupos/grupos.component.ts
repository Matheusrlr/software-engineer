import { Component, OnInit } from '@angular/core';
import { Grupos } from './grupo';
import { GrupoService } from '../grupo.service';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  grupos: Grupos[];
  grupoSelecionado: Grupos;
  grupoNovo: Grupos;

  constructor(private grupoService: GrupoService, private modalService: NgbModal) { }

  ngOnInit() {
    this.loadGrupos();
  }
  editar(grupo: Grupos, content): void {

    this.grupoSelecionado = grupo;

    this.modalService.open(content, {ariaLabelledBy: 'modal-editar-grupo'})
      .result.then((grupoForm: NgForm) => {
        this.grupoSelecionado.nome = grupoForm.value.nome;
        this.grupoSelecionado.projetos = grupoForm.value.projetos;
        this.grupoSelecionado.id = grupoForm.value.id;
        this.grupoSelecionado.professores = grupoForm.value.professores;
        console.log(this.grupoSelecionado);
        this.salvar(this.grupoSelecionado);
    });
  }

  loadGrupos(): void {
    this.grupoService.getGrupo().subscribe(
      grupos => this.grupos = grupos
    );
  }

  selecionarGrupo(grupo: Grupos): void {
    this.grupoSelecionado = grupo;
  }

  salvar(grupo: Grupos): void {
    this.grupoService.atualizarGrupo(grupo).subscribe();
  }

  apagar(grupo: Grupos): void {
    this.grupoService.apagarGrupo(grupo).subscribe();
    this.grupos = this.grupos.filter(a => a !== grupo);
  }

  adicionar(content): void {
    this.grupoNovo = new Grupos();

    this.modalService.open(content, {ariaLabelledBy: 'modal-adicionar-grupo'})
      .result.then((grupoFormAdidionar: NgForm) => {
      this.salvarNovoGrupo(this.grupoNovo);
      this.grupos.push(this.grupoNovo);
    });
  }

  cancelar(): void {
    this.grupoNovo = null;
  }

  salvarNovoGrupo(grupo: Grupos): void {
    this.grupoService.adicionar(grupo).subscribe();
}
}
