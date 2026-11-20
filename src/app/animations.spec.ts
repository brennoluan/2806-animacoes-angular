import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { filterTrigger, formButtonTrigger } from './animations';

@Component({
  template: `
    <div *ngIf="visible" @filterAnimation>Tarefa</div>
    <button [@formButton]="valid ? 'valid' : 'invalid'">Salvar</button>
  `,
  animations: [filterTrigger, formButtonTrigger],
})
class AnimationTestComponent {
  visible = true;
  valid = false;
}

describe('task animations', () => {
  it('builds the filter animation when tasks enter and leave', () => {
    TestBed.configureTestingModule({
      declarations: [AnimationTestComponent],
      imports: [CommonModule, BrowserAnimationsModule],
    });

    const fixture = TestBed.createComponent(AnimationTestComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Tarefa');

    fixture.componentInstance.visible = false;
    fixture.detectChanges();
  });
});
