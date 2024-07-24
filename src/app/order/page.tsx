"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import BrandComponent from "@/components/DeviceComponents/brand_component";
import BrandModelComponent from "@/components/DeviceComponents/brand_model_component";
import DeviceTypeComponent from "@/components/DeviceComponents/device_type_component";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import OrderComponent from "@/components/OrderComponents/order_component";
import Link from "next/link";
import { usePathname } from 'next/navigation'

const Index= () => {
  const pathname = usePathname();
  return (
    <DefaultLayout>
      <Breadcrumb  pageName="Orders" />
    
      <OrderComponent/>
    </DefaultLayout>
  );
};

export default Index;
