"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Dropdown from "@/components/common/Dropdown";
import Pagination from "@/components/common/Pagination";

import ScheduleComponent from "@/components/ScheduleComponent/schedule_component";
import { axiosPrivate } from "@/helper/axiosPrivate";

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { LIMIT } from "@/helper/constants";

const SchedulePage = () => {
  const searchParams=useSearchParams();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();


  const onPageChange = (e: any) => {
    console.log("what is the page count");
    console.log(e);
    setCurrentPage(e - 1);
  }
  const [currentPage, setCurrentPage] = useState(0);




  const fetchData = async () => {
    try {
      setLoading(true);
      let params:any = {
        offset: currentPage,
        limit: LIMIT
      }
      if (searchParams.get("type")) {
       
        if (searchParams.get("type") == "user") {
          params.userId = searchParams.get("id");
        }
      }
      if(mode){
        params.payment_mode=mode;
      }
      if(scheduleStatus){
        params.schedule_status=scheduleStatus=="Accepted"?"Both":"S2D";
      }
      if(type){
        params.type=type=="One way"?'one_way':'two_way';
      }
      if(status){
        params.status=status=="Active"?'active':'cancelled';
      }
      if(time){
        params.time=time!.toString().toLowerCase();
      }
      if (searchParams.get("type")) {
       
        if (searchParams.get("type") == "driver") {
        
          params= {
            offset: currentPage,
            limit: LIMIT,
            driverId: searchParams.get("id")
          }
        }
      }
      const result = await axiosPrivate.get(searchParams.get("type")&&searchParams.get("type") == "driver"?"/v1/schedule/driver/admin": "/v1/schedule/all", {
        params: params
      });
      setData(result.data ?? []);

    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }





  const [scheduleStatus, setScheduleStatus] = useState<any>(null);
  const [type, setType] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [mode, setPaymentMode] = useState<any>(null);
  const [time, setTime] = useState<any>(null);
  useEffect(() => {

    fetchData();


  }, [currentPage, scheduleStatus, type, status, time,mode]);
  return (
    <DefaultLayout>
      <Breadcrumb pageName={searchParams.get("name") ? `${searchParams.get("name")} Schedule` : `Schedule`} />
      {
        searchParams.get("type")&&searchParams.get("type") == "driver"?<></>:  <div className="w-full grid grid-cols-4 gap-5">
        <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setScheduleStatus(e);
        }} options={["Accepted", "Non Accepted"]} title="Select Schedule Status" heading="Schedule Status" selected={scheduleStatus ?? ""} />
        <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setType(e);
        }} options={["One way", "Two Way"]} title="Select type" heading="Type" selected={type ?? ""} />
        <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setTime(e);
        }} options={["Upcoming", "Past", "Today"]} title="Select time" heading="Time" selected={time ?? ""} />
         <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setPaymentMode(e);
        }} options={['online', 'cash']} title="Select Payment Mode" heading="Payment Mode" selected={mode ?? ""} />
        <Dropdown onSelect={(e) => {
          console.log("what is the onSelect");
          console.log(e);
          setStatus(e);
        }} options={["Active", "Cancelled"]} title="Select Status" heading="Status" selected={status ?? ""} />
        <button
          onClick={(e) => {
            setCurrentPage(0);
            setScheduleStatus(null);
            setType(null);
            setStatus(null);
            setTime(null);
            setPaymentMode(null);
          }}
          className="inline-flex items-center justify-center rounded-md border border-primary h-10 w-30 mt-10 text-center font-medium text-primary hover:bg-opacity-90"
        >
          Clear
        </button>
      </div>


      }
    
   {
    (Math.ceil(data?.count ?? 0) / LIMIT)>1? <div className="flex flex-row items-center justify-end my-5">

    <Pagination
      currentPage={currentPage + 1}
      totalPages={Math.ceil(data?.count ?? 0) / LIMIT}
      onPageChange={onPageChange}
    />
  </div>:<></>
   }  
      <ScheduleComponent data={data?.data ?? []} />
    </DefaultLayout>
  );
};

export default SchedulePage;
