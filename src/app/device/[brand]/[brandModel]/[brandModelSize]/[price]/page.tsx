"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Breadcrumbs from "@/components/Breadcrumb";

import BrandComponent from "@/components/DeviceComponents/brand_component";
import BrandModelSizeComponent from "@/components/DeviceComponents/brand_model_size_component";
import DevicePriceComponent from "@/components/DeviceComponents/device_price_component";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { usePathname } from 'next/navigation'


const Index= () => {
  const pathname = usePathname();
  return (
    <DefaultLayout>
      <Breadcrumb  pageName="Device Price" />
      <Breadcrumbs />
      <div className="w-full flex flex-row justify-end my-4">
      <Link
              href={`${pathname}/add`}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
             Add
            </Link>
      </div>
      <DevicePriceComponent />
    </DefaultLayout>
  );
};

export default Index;
