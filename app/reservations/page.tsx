import EmptyState from "../components/EmptyState";

import ReservationsClient from "./ReservationsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";


const ReservationsPage = async() =>{
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return(
            <EmptyState
                title="Não autorizado"
                subtitle="Por favor, realize o login"
            />
        )
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    })

    if(reservations.length === 0){
        return(
            <EmptyState
                title="Nenhuma reserva foi encontrada"
                subtitle="Parece que não há reservas para sua propriedade "
            />
        )
    }

    return(
        <ReservationsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    )
};

export default ReservationsPage;