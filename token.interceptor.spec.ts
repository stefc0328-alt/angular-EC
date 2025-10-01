import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TokenInterceptor } from './token.interceptor';
import { Token } from '@angular/compiler';

describe('TokenInterceptor', () => {
  let component: Token;
  let fixture: ComponentFixture< Token>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TokenInterceptor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Token);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
