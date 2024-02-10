import EmptyState from "../components/EmptyState";
import FavoritesClient from "./FavoritesClient";

import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

const ListingPage = async () => {
    const listings = await getFavoriteListings();
    const currentUser = await getCurrentUser();

    if(listings.length === 0){
        return (
            <EmptyState
                title="Nenhum favotiro encontrado"
                subtitle="Parece que você não possui nenhum favorito"
            />
        )
    }
    
    return (
        <FavoritesClient
            listings={listings}
            currentUser={currentUser}
        />
    )
    
}

export default ListingPage;
