"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import ContactComponent from "@/components/ContactComponents/contact_component";
import BrandComponent from "@/components/DeviceComponents/brand_component";
import BrandModelComponent from "@/components/DeviceComponents/brand_model_component";
import DeviceTypeComponent from "@/components/DeviceComponents/device_type_component";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { usePathname } from 'next/navigation'


const Index= () => {
  const pathname = usePathname();
  return (
    <DefaultLayout>
      <Breadcrumb  pageName="Contacts" />
     
      <ContactComponent />
    </DefaultLayout>
  );
};

export default Index;
