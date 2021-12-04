import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import App from "./App";

it("renders without crashing", function () {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
});

it("matches snapshot", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
