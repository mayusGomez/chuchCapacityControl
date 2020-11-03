import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SignupPagePage } from './signup-page.page';

describe('SignupPagePage', () => {
  let component: SignupPagePage;
  let fixture: ComponentFixture<SignupPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupPagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
