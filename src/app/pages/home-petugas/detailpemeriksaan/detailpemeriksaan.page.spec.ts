import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailpemeriksaanPage } from './detailpemeriksaan.page';

describe('DetailpemeriksaanPage', () => {
  let component: DetailpemeriksaanPage;
  let fixture: ComponentFixture<DetailpemeriksaanPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpemeriksaanPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailpemeriksaanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
