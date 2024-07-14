"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import DateOfBirth from "@/components/FormElements/DatePicker/DateOfBirth";
import SelectStatus from "@/components/SelectGroup/SelectStatus";
import { useFormik } from "formik";
import * as Yup from 'yup';
import SelectGender from "@/components/SelectGroup/SelectGender";
import PersonalInformation from "@/components/SettingComponents/PersonalInformation";
import ApproveInformation from "@/components/SettingComponents/ApproveComponent";
import ImageUpdateComponent from "@/components/SettingComponents/ImageUpdateComponent";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { axiosPrivate } from "@/helper/axiosPrivate";
import Link from "next/link";
import { toast } from "react-toastify";
import navigateToMap from "@/helper/navigateToMap";
import CarInformation from "@/components/SettingComponents/CarComponent";
import DocumentInformation from "@/components/SettingComponents/DocumentComponent";
import useUserData from "@/hooks/userData";
import SchedulePaymentMode from "@/components/SettingComponents/ApproveComponent";



const Settings = () => {

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();






  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axiosPrivate.get(`/v1/schedule/${ pathname.split("/")[(pathname.split("/").length - 1)]}`);
      console.log("what is the Shedule",result)
      setData(result?.data);

    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {

    fetchData();


  }, []);





  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumb pageName="Schedule Settings" />
       
        <SchedulePaymentMode  data={data} />

      </div>
    </DefaultLayout>
  );
};

export default Settings;
