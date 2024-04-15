import { Package } from "@/types/package";
import moment from "moment";
import ScheduleTableItemCard from "./schedule_table_item_card";

const ScheduleComponent = ({ data }: { data: any }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white xl:pl-11">
                                Name
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Notes
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Dates
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                Time
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                CreatedAt
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                type
                            </th>
                            {/* <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                                status
                            </th>
                            <th className="min-w-[150px] px-4 py-4 font-medium text-black dark:text-white">
                               Schedule status
                            </th>
                            <th className="min-w-[120px] px-4 py-4 font-medium text-black dark:text-white">
                                Trips
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                User
                            </th>
                            <th className="px-4 py-4 font-medium text-black dark:text-white">
                                Drivers
                            </th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item: any, index: number) => <ScheduleTableItemCard index={index} item={item} />)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScheduleComponent;