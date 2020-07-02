import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StreamUpdatePage } from './stream-update.page';

describe('StreamUpdatePage', () => {
  let component: StreamUpdatePage;
  let fixture: ComponentFixture<StreamUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StreamUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StreamUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
