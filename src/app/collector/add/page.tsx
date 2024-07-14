"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { serverTimestamp } from 'firebase/firestore';

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { addUser } from "@/service/user.service";

const Add = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();
    console.log("what is the path name", pathname);
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: ''
        },
        validationSchema: Yup.object({


            name: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {

            try {
                await addUser({
                    name: values.name,
                    email: values.email,
                    mobile: values.mobile,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                })
                router.back();
                resetForm();


            } catch (error: any) {
                toast.error(error?.message ?? "Something went wrong");
            }

            // 
        },
    });

    return (
        <DefaultLayout>
            <Breadcrumb pageName={"Add Device Collectors"} />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Name
                                        </label>
                                        <input
                                            {...formik.getFieldProps('name')}
                                            type="text"
                                            placeholder="Enter the name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.errors.name ? (
                                            <div className="text-sm text-black mt-2 ml-2">{formik.errors.name}</div>
                                        ) : null}
                                    </div>


                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Email
                                        </label>
                                        <input
                                            {...formik.getFieldProps('email')}
                                            type="text"
                                            placeholder="Enter the email"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.errors.email ? (
                                            <div className="text-sm text-black mt-2 ml-2">{formik.errors.email}</div>
                                        ) : null}
                                    </div>


                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Mobile Number
                                        </label>
                                        <input
                                            {...formik.getFieldProps('mobile')}
                                            type="text"
                                            placeholder="Enter the mobile number"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.errors.mobile ? (
                                            <div className="text-sm text-black mt-2 ml-2">{formik.errors.mobile}</div>
                                        ) : null}
                                    </div>


                                </div>







                                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>


            </div>
        </DefaultLayout>
    );
};

export default Add;
