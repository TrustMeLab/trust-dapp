import { useState, useEffect } from "react";
import { Tenant, Owner, Lease } from "../repositories/TrustAPI";
import {
  getTenantInfosReview,
  getOwnerInfosReview,
} from "../repositories/services/queries";
import useReviewDetails from "./useReviewDetails";

const useReview = (userId: string, profile: string): Tenant | Owner | null => {
  const [user, setUser] = useState<Tenant | Owner | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!profile) return;
        if (profile === "tenant") {
          const response = await getTenantInfosReview(userId);

          if (response?.data?.data?.tenants) {
            const tenantInfos = response?.data?.data?.tenants[0];
            const leasesWithReviewsInStrings = await Promise.all(
              tenantInfos.leases.map(async (lease: Lease) => {
                // call IPFS
                const reviewInString = await useReviewDetails(
                  lease.tenantReviewUri
                );

                return { ...lease, tenantReviewUri: reviewInString };
              })
            );

            setUser({
              ...response.data.data.tenants[0],
              leases: leasesWithReviewsInStrings,
            });
          }
        } else {
          const response = await getOwnerInfosReview(userId);
          if (response?.data?.data?.owners) {
            const ownerInfos = response?.data?.data?.owners[0];
            const leasesWithReviewsInStrings = await Promise.all(
              ownerInfos.leases.map(async (lease: Lease) => {
                // call IPFS
                const reviewInString = await useReviewDetails(
                  lease.ownerReviewUri
                );

                return { ...lease, ownerReviewUriReviewUri: reviewInString };
              })
            );

            setUser({
              ...response.data.data.owners[0],
              leases: leasesWithReviewsInStrings,
            });
          }
        }
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error(err);
      }
    };

    fetchData();
  }, [userId]);
  return user;
};

export default useReview;
