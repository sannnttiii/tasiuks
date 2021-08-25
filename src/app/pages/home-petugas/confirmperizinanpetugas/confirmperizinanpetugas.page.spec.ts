import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmperizinanpetugasPage } from './confirmperizinanpetugas.page';

describe('ConfirmperizinanpetugasPage', () => {
  let component: ConfirmperizinanpetugasPage;
  let fixture: ComponentFixture<ConfirmperizinanpetugasPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmperizinanpetugasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmperizinanpetugasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
