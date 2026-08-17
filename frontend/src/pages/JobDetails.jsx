import {useAuth} from '../context/AuthContext';
import { useLocation, useNavigate } from "react-router-dom";
import { useJobApplication } from '../components/Hooks/useJobApplication';
import ApplyButton from './Jobs/ApplyButton';

const JobDetails = () => {

  // const [companyDetails, setCompanyDetails] = useState()

  const location = useLocation();
  const jobData = location.state;
  
  const { userData } = useAuth();
  const {companyDetails, setIsApplied, isApplied, loading} = useJobApplication(jobData, userData);  
  const navigate = useNavigate();
  console.log("Job Data in JobDetails:", jobData, companyDetails, isApplied, loading);

  if (loading || !companyDetails || !jobData) {
    return <div className="pt-20 text-center">Loading Job Details...</div>;
  }

  

  const applicationDetails = userData? {
    jobId: jobData._id,
    jobPosition: jobData.position,
    companyId: jobData.companyId,
    applicantId: userData?._id || null,
  } : null;


  // Helper component for section titles
  const SectionTitle = ({ children }) => (
    <h3 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b border-purple-300">
      {children}
    </h3>
  );

  

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-8 pt-20 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* --- Job Header and Quick Info --- */}
        <div className="bg-white shadow-xl rounded-lg p-6 sm:p-8 mb-8">
          <div className="flex justify-between items-start md:items-center flex-col md:flex-row">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-1">{jobData.position}</h1>
              <p className="text-xl text-cyan-700 font-semibold mb-3">{jobData.companyName}</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm md:text-base">
                <span className="flex items-center">
                <span className="mr-2">&#x1F4CD;</span>
                <span>{jobData.location}</span>
                </span>
                <span className="flex items-center">
                <span className="mr-2">&#x1F4B5;</span>
                <span className='font-bold' > BDT {jobData.salary? `${jobData.salary}` : "Negotiable"}</span>
                </span>
                <span className="text-sm text-gray-400 self-center font-semibold">
                  Posted: {new Date(jobData.updatedAt).toLocaleDateString('en-US',{day: '2-digit', month: 'short', year: 'numeric'}) }
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <ApplyButton 
            applicationDetails={applicationDetails}
            isApplied={isApplied}
            setIsApplied={setIsApplied}
            />
          </div>
        </div>

        {/* --- Main Content Layout (Two Columns) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Job Details) - Takes 2/3 width on large screens */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Job Description */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <SectionTitle>Job Description</SectionTitle>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {jobData.description}
                </p>
              
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <SectionTitle>Key Requirements</SectionTitle>
              <ul className="list-disc list-inside text-gray-700 text-base space-y-2 ml-4">
                { jobData.requirements}
              </ul>
            </div>

          </div>

          {/* Right Column (Company & Benefits) - Takes 1/3 width on large screens */}
          <div className="lg:col-span-1 space-y-8">

            {/* Company Overview (Similar to your About/Contact section) */}
            <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <SectionTitle>About {companyDetails.name}</SectionTitle>
              <p className="text-gray-700 mb-4">
                {companyDetails.about}
              </p>
              <div className="text-base text-gray-700 space-y-2">
                <p className="flex items-center"><span className="font-semibold w-20">Website:</span> <a href="#" className="text-blue-600 hover:underline">{companyDetails.website}</a></p>
                <p className="flex items-center"><span className="font-semibold w-20">Address:</span> {companyDetails.address}</p>
                
              </div>
            </div>

            {/* Benefits Section (Similar to your Skills section) */}
            {/* <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
              <SectionTitle>Perks & Benefits</SectionTitle>
              <div className="flex flex-wrap gap-3">
                {benefits.map((benefit, index) => (
                  <span 
                    key={index} 
                    className="bg-purple-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded-full shadow-sm"
                  >
                    {benefit}
                  </span>
                ))}
              </div>
            </div> */}
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default JobDetails;

