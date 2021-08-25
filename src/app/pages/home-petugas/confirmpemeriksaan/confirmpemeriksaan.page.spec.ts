import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConfirmpemeriksaanPage } from './confirmpemeriksaan.page';

describe('ConfirmpemeriksaanPage', () => {
  let component: ConfirmpemeriksaanPage;
  let fixture: ComponentFixture<ConfirmpemeriksaanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmpemeriksaanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmpemeriksaanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
