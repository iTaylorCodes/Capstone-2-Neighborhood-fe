import HotelCard from "./HotelCard";
import { render } from "@testing-library/react";
import { UserProvider } from "../testUtils";

const hotel = {
  id: 634418464,
  name: "The Grand NYC",
  starRating: 2,
  neighbourhood: "NoMad",
  address: {
    streetAddress: "38 West 31st Street",
    locality: "New York",
    postalCode: "10001",
    region: "NY",
    countryName: "United States",
  },
};

it("renders without crashing", () => {
  render(
    <UserProvider>
      <HotelCard hotel={hotel} />
    </UserProvider>
  );
});

it("matches snapshot", () => {
  const { asFragment } = render(
    <UserProvider>
      <HotelCard hotel={hotel} />
    </UserProvider>
  );
  expect(asFragment()).toMatchSnapshot();
});
