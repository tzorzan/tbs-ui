/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TbsService } from './tbs.service';

describe('Service: Tbs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TbsService]
    });
  });

  it('should ...', inject([TbsService], (service: TbsService) => {
    expect(service).toBeTruthy();
  }));
});
