import {useState , useEffect} from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000"; 

export const useJobApplication = (jobData, userData) => {
    const [isApplied, setIsApplied] = useState(false);
    const [loading, setLoading] = useState(true);
    const [companyDetails, setCompanyDetails] = useState(null);

    useEffect(() => {

       if (!jobData?._id || !jobData?.companyId) {
            setLoading(false);
            return;
        }

        const fetchData = async () => {
            setLoading(true);
            try {
                const companyResposne = await axios.get(`${API_BASE_URL}companyDetails/${jobData.companyId}`,
                     {
                    // headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
                });
                setCompanyDetails(companyResposne.data.companyDetails);

                if (!userData?._id) {
                const applicationResponse = await axios.get(`${API_BASE_URL}checkApplication/${jobData._id}/${userData._id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` }
                });
                setIsApplied(applicationResponse.data.isApplied); 
                }
                } catch (error) {
                console.error("Error fetching job application data:", error);
            } finally {
            setLoading(false);
            }
        };
        fetchData();
    }, [jobData?._id, userData?._id, jobData?.companyId]);
    return { setIsApplied,isApplied, loading, companyDetails };
}