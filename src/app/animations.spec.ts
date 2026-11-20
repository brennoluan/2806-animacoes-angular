import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { filterTrigger, formButtonTrigger, shakeTrigger } from './animations';

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

@Component({
  template: `
    <form [@shakeAnimation]="value">
      <input class="ng-invalid">
    </form>
  `,
  animations: [shakeTrigger],
})
class ShakeTestComponent {
  value = '';
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

  it('allows form changes with and without a focused invalid field', async () => {
    TestBed.configureTestingModule({
      declarations: [ShakeTestComponent],
      imports: [BrowserAnimationsModule],
    });

    const fixture = TestBed.createComponent(ShakeTestComponent);
    document.body.appendChild(fixture.nativeElement);
    try {
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      fixture.componentInstance.value = 'sem foco';
      fixture.detectChanges();
      await fixture.whenRenderingDone();

      const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
      input.focus();
      expect(document.activeElement).toBe(input);
      fixture.componentInstance.value = 'com foco';
      fixture.detectChanges();
      await fixture.whenRenderingDone();
    } finally {
      fixture.destroy();
      fixture.nativeElement.remove();
    }
  });
});
