 import EmptyState from "../components/EmptyState"

 import getCurrentUser from "../actions/getCurrentUser"
 import getReservations from "../actions/getReservations"
import TripsClient from "./TripsClient";

 const TripsPage = async () =>{
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return(
                <EmptyState
                    title="Não autorizado!"
                    subtitle="Faça o Login"
                />
        )
    
}
        const reservations = await getReservations({
            userId: currentUser.id
 })

 if (reservations.length === 0){
    return (
        <EmptyState
            title="Nenhuma viagem encontrada"
            subtitle="Parece que você ainda não reservou nenhuma viajem"
        />
    )
 }

 return (
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
 )

}
export default TripsPage;