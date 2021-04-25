import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Items.TableComponent } from './items.table.component';

describe('Items.TableComponent', () => {
  let component: Items.TableComponent;
  let fixture: ComponentFixture<Items.TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Items.TableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Items.TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
