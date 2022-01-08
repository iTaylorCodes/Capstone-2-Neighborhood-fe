import { render, act, fireEvent } from "@testing-library/react";
import Home from "./Home";
import * as redux from "react-redux";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "../rootReducer";
import { MemoryRouter } from "react-router-dom";

const store = createStore(rootReducer);

const reduxSpy = jest.spyOn(redux, "useSelector");

beforeEach(() => {
  reduxSpy.mockReturnValue({
    accountWasDeleted: false,
    recentSearches: [],
  });
});

it("renders without crashing", () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <Provider store={store}>
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    </Provider>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("shows alerts for accountWasDeleted", () => {
  act(() => {
    reduxSpy.mockReturnValue({
      accountWasDeleted: true,
      recentSearches: [],
    });

    const { getByText } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Home />
        </MemoryRouter>
      </Provider>
    );

    const alert = getByText("Your account has been deleted.");

    expect(alert).toBeTruthy();
  });
});