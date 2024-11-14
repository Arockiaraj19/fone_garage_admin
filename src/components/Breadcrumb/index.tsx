import Link from "next/link";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "@/helper/firebase";
import {
  getDoc,
  collection,
  query,
  where,
  getDocs,
  startAfter,
  limit,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore"; // Import your Firebase configuration

const Breadcrumb = () => {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<any>([]);

  // Map IDs to Firebase collections
  const collectionMap: any = {
    "1": "deviceTypes",
    "2": "brands",
    "3": "brandModels",
    "4": "brandModelSizes",
    // Add more mappings as needed
  };

  const getCollectionFromId = (id: any) => collectionMap[id] || null;

  // Fetch name from Firebase based on ID and collection
  const fetchNameFromFirebase = async (id: any, index: any) => {
    console.log("index", index.toString());
    if (index == 0) {
      return id;
    }
    const collectionName = getCollectionFromId(index.toString());
    console.log("collection name", collectionName);
    if (!collectionName) return id;

    try {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);
      return docSnap.exists() ? docSnap.data().name : id;
    } catch (error) {
      console.error("Error fetching document:", error);
      return id;
    }
  };

  useEffect(() => {
    const loadBreadcrumbs = async () => {
      const pathnames = pathname.split("/").filter((x) => x);
      console.log("pathnames", pathnames);
      const breadcrumbTrail = await Promise.all(
        pathnames.map(async (id, index) => {
          const name = await fetchNameFromFirebase(id, index);
          return {
            name,
            href: `/${pathnames.slice(0, index).join("/")}`,
          };
        }),
      );

      localStorage.setItem("breadcrumbs", JSON.stringify(breadcrumbTrail));
      setBreadcrumbs(breadcrumbTrail);
    };

    loadBreadcrumbs();
  }, [pathname]);

  useEffect(() => {
    const savedBreadcrumbs = localStorage.getItem("breadcrumbs");
    if (savedBreadcrumbs) {
      setBreadcrumbs(JSON.parse(savedBreadcrumbs));
    }
  }, []);

  return (
    <nav aria-label="breadcrumb" className="my-4">
      <ol className="text-gray-600 flex space-x-2 text-sm">
        {breadcrumbs.map((breadcrumb: any, index: any) => {
          const isLast = index === breadcrumbs.length - 1;
          if (index == 0) {
            return <></>;
          }
          return (
            <li
              onClick={(e: any) => {
                window.location.href = breadcrumb.href;
                console.log("what is the href", breadcrumb.href);
              }}
              key={breadcrumb.href}
              className="flex cursor-pointer items-center"
            >
              {!isLast ? (
                <>
                  <p className=" cursor-pointer text-blue-600">
                    {breadcrumb.name}
                  </p>

                  <span className="text-gray-400 mx-2">/</span>
                </>
              ) : (
                <span className="text-blue-600 ">{breadcrumb.name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
