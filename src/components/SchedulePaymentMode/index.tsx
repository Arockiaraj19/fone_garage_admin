import DateOfBirth from "@/components/FormElements/DatePicker/DateOfBirth"
import SelectGender from "@/components/SelectGroup/SelectGender"
import SelectStatus from "@/components/SelectGroup/SelectStatus"
import Dropdown from "@/components/common/Dropdown";
import { axiosPrivate } from "@/helper/axiosPrivate";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';

import { useParams, usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
const ApproveInformation = ({ data }: { data: any }) => {
    const router = useRouter();
    const pathname = usePathname();
    const submit = async () => {
        if (status == null) {
            return;
        }
        try {
            const result = await axiosPrivate.put("/v1/user/approve", {
                statusReason: "Good",
                status: status,
                userId: pathname.split("/")[(pathname.split("/").length - 1)]
            });
            toast.success("Status updated successfully");
            router.refresh();
        } catch (error) {

        }
    }
    const [status, setStatus] = useState(data?.status);
    return <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                    Approval Information
                </h3>
            </div>
            <div className="p-7">
                <form action="#">


                    <div className="mb-5.5">
                        <Dropdown heading="Select Status" title="Select Status" onSelect={(e) => {
                            console.log("what is the onselect");
                            console.log(e);
                            setStatus(e);
                        }} options={['pending', 'approved', 'rejected']} selected={status} />
                    </div>





                    <div className="flex justify-end gap-4.5">

                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                submit()
                            }}
                            className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90"
                            type="submit"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

}

export default ApproveInformation;