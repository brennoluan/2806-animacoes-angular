import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Tarefa } from '../interface/tarefa';
import { TarefaService } from './tarefa.service';

describe('TarefaService', () => {
  let service: TarefaService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TarefaService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('lists tasks with the JSON Server descending sort syntax', () => {
    service.listar();

    const request = httpController.expectOne((req) =>
      req.url === 'http://localhost:3000/tarefas' &&
      req.params.get('_sort') === '-id' &&
      !req.params.has('_order')
    );
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('creates tasks without an id so JSON Server can generate one', () => {
    const novaTarefa = {
      descricao: 'Estudar Angular',
      categoria: 'Estudos',
      statusFinalizado: false,
      prioridade: 'Normal',
    };
    let tarefas: Tarefa[] = [];
    service.tarefas$.subscribe((lista) => tarefas = lista);

    service.criar(novaTarefa);

    const request = httpController.expectOne('http://localhost:3000/tarefas');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(novaTarefa);
    request.flush({ ...novaTarefa, id: 6 });

    expect(tarefas).toEqual([{ ...novaTarefa, id: 6 }]);
  });
});
