import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

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
    service.listar('').subscribe();

    const request = httpController.expectOne((req) =>
      req.url === 'http://localhost:3000/tarefas' &&
      req.params.get('_sort') === '-id' &&
      !req.params.has('_order')
    );
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });
});
