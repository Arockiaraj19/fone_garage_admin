"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CountryComponent from "@/components/CountryComponent/country_component";
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
      <Breadcrumb  pageName="Country" />
      <div className="w-full flex flex-row justify-end my-4">
      <Link
              href={`${pathname}/add`}
              className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
             Add
            </Link>
      </div>
      <CountryComponent/>
    </DefaultLayout>
  );
};

export default Index;
