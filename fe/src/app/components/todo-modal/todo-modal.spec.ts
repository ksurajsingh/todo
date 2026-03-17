import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTodoModalComponent} from './todo-modal';

describe('addTodoModalComponent', () => {
  let component: AddTodoModalComponent;
  let fixture: ComponentFixture<AddTodoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTodoModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTodoModalComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
