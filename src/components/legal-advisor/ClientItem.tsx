import React from 'react';
import Image from 'next/image';
import { ClientItem as ClientItemType } from '@/types/legal-advisor/clients';

interface ClientItemProps {
  item: ClientItemType;
}

const ClientItem = ({ item }: ClientItemProps) => {
  return (
    <div className="swiper-slide clients-la__item">
      <Image
        src={item.logo}
        alt={item.alt}
      />
    </div>
  );
};

export default ClientItem;
