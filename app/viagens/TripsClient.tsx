'use client'


import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation"
import { useCallback, useState } from 'react';

import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../components/listings/ListingCard";

import { SafeReservation, SafeUser } from "../types";


interface TripsClientProps{
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

const TripsClient: React.FC<TripsClientProps> = ({
  reservations,
  currentUser
}) => {
  const router = useRouter();
  const [deleteingId, setDeletingId] = useState('');

  const onCancel = useCallback((id: string)=>{
    setDeletingId(id);

    axios.delete(`/api/reservations/${id}`)
    .then(()=>{
      toast.success('Reserva cancelada')
      router.refresh()
    })
      .catch((error)=>{
        toast.error(error?.response?.data?.error);
      })
      .finally(()=>{
        setDeletingId('')
      })
  },[router])
  return (
    <Container>
      <Heading
        title="Viagens"
        subtitle="Para onde deseja ir"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"> 
        {reservations.map((reservation)=>(
          <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              actionId={reservation.id}
              onAction={onCancel}
              disabled={deleteingId == reservation.id}
              actionLabel="Cancelar reserva"
              currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  )
}

export default TripsClient