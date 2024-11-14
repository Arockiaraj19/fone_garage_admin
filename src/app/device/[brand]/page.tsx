"use client";
import Breadcrumb from "@/components/Breadcrumb";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumb";
import BrandComponent from "@/components/DeviceComponents/brand_component";
import DeviceTypeComponent from "@/components/DeviceComponents/device_type_component";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Index = () => {
  const pathname = usePathname();
  return (
    <DefaultLayout>
      <Breadcrumbs pageName="Device Brand" />
      <Breadcrumb />
      <div className="my-4 flex w-full flex-row justify-end">
        <Link
          href={`${pathname}/add`}
          className="inline-flex items-center justify-center rounded-md border border-primary px-10 py-4 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add
        </Link>
      </div>
      <BrandComponent />
    </DefaultLayout>
  );
};

export default Index;
