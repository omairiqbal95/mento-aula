import { StaticImageData } from "next/image";
import clientsDigital1 from "@/assets/images/clients/clients-digital-1.png";
import clientsDigital2 from "@/assets/images/clients/clients-digital-2.png";
import clientsDigital3 from "@/assets/images/clients/clients-digital-3.png";
import clientsDigital4 from "@/assets/images/clients/clients-digital-4.png";
import clientsDigital5 from "@/assets/images/clients/clients-digital-5.png";
import clientsDigital6 from "@/assets/images/clients/clients-digital-6.png";
import clientsDigital7 from "@/assets/images/clients/clients-digital-7.png";
import clientsDigital8 from "@/assets/images/clients/clients-digital-8.png";

export interface ClientItem {
  id: string;
  name: string;
  logo: StaticImageData;
  delay: string;
}

export interface ClientsData {
  sectionSubtitle: string;
  sectionTitle: string;
  clients: ClientItem[];
}

export const clientsData: ClientsData = {
  sectionSubtitle: "Trusted Clients",
  sectionTitle: "We are happy to work with global largest brands",
  clients: [
    {
      id: "1",
      name: "Microsoft",
      logo: clientsDigital1,
      delay: "0",
    },
    {
      id: "2",
      name: "Google",
      logo: clientsDigital2,
      delay: ".2",
    },
    {
      id: "3",
      name: "Apple",
      logo: clientsDigital3,
      delay: ".4",
    },
    {
      id: "4",
      name: "Amazon",
      logo: clientsDigital4,
      delay: ".6",
    },
    {
      id: "5",
      name: "Netflix",
      logo: clientsDigital5,
      delay: ".8",
    },
    {
      id: "6",
      name: "Adobe",
      logo: clientsDigital6,
      delay: "1",
    },
    {
      id: "7",
      name: "Tesla",
      logo: clientsDigital7,
      delay: "1.2",
    },
    {
      id: "8",
      name: "Spotify",
      logo: clientsDigital8,
      delay: "1.4",
    },
  ],
};
