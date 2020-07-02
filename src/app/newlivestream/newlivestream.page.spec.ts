import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewlivestreamPage } from './newlivestream.page';

describe('NewlivestreamPage', () => {
  let component: NewlivestreamPage;
  let fixture: ComponentFixture<NewlivestreamPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewlivestreamPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewlivestreamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
