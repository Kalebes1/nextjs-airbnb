import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingsById from "@/app/actions/getListingById";

import ListingClient from "./ListingClient";

import EmptyState from "@/app/components/EmptyState";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({ params }: { params: IParams }) => {
  
  const listing = await getListingsById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
        <EmptyState />
    );
  }
  return (
      <ListingClient listing={listing} currentUser={currentUser} />
  );
};

export default ListingPage;
