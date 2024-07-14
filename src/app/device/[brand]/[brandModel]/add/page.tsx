"use client"
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { serverTimestamp } from 'firebase/firestore';

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { addBrandModel,updateBrandModel } from "@/service/brand_model.service";

const Add = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
const router=useRouter();
    console.log("what is the path name",pathname);
    const formik = useFormik({
        initialValues: {
            name: ''

        },
        validationSchema: Yup.object({


            name: Yup.string().required('Required'),
        }),
        onSubmit: async (values, { resetForm }) => {

            try {
                if (searchParams.get("id")) {
                    await updateBrandModel(searchParams.get("id"),
                        {
                            name: values.name,

                            updatedAt: serverTimestamp(),

                        })
                } else {
                    await addBrandModel({
                        name: values.name,
                        brandId:pathname.split("/")[(pathname.split("/").length - 2)],
                        createdAt: serverTimestamp(),
                        updatedAt: serverTimestamp(),
                    })
                }
                router.back();
                resetForm();
                

            } catch (error: any) {
                toast.error(error?.message ?? "Something went wrong");
            }

            // 
        },
    });
    useEffect(() => {

        if (searchParams.get("id")) {
            formik.setValues({
                name: searchParams.get("name") ?? ""
            });
        }
    }, [])

    return (
        <DefaultLayout>
            <Breadcrumb pageName={searchParams.get("id")?"Edit Brand Model":"Add Brand Model"} />

            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <form onSubmit={formik.handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full">
                                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                                            Brand Model Name
                                        </label>
                                        <input
                                            {...formik.getFieldProps('name')}
                                            type="text"
                                            placeholder="Enter your Brand Model name"
                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                        />
                                        {formik.errors.name ? (
                                            <div className="text-sm text-black mt-2 ml-2">{formik.errors.name}</div>
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
