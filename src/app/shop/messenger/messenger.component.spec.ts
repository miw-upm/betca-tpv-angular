import { NO_ERRORS_SCHEMA } from "@angular/core";
import { MessengerComponent } from "./messenger.component";
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("MessengerComponent", () => {

  let fixture: ComponentFixture<MessengerComponent>;
  let component: MessengerComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
      ],
      declarations: [MessengerComponent]
    });

    fixture = TestBed.createComponent(MessengerComponent);
    component = fixture.componentInstance;

  });

  it("should be able to create component instance", () => {
    expect(component).toBeDefined();
  });
  
});
