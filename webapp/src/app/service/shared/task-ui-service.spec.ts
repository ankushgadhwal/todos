import { TestBed } from '@angular/core/testing';

import { TaskUiService } from './task-ui-service';

describe('TaskUiService', () => {
  let service: TaskUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
