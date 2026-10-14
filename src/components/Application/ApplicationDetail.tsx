import { useState } from "react";
import { Link, useParams } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError } from "../../lib/alert";
import {
  applicationDetail,
  type Application,
} from "../../lib/api/ApplicationAPI";

export default function ApplicationDetail() {
  const [token] = useLocalStorage("token", "");
  const { id } = useParams();
  const numericId = Number(id);
  const [application, setApplication] = useState<Application | null>(null);

  async function fetchApplication() {
    const response = await applicationDetail(token ?? "", numericId);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setApplication(responseBody.data);
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchApplication().then(() =>
      console.log("Application detail fetched successfully"),
    );
  });

  if (!application) {
    return <p className="text-gray-300">Loading...</p>;
  }

  return (
    <>
      <div className="flex items-center mb-6">
        <Link
          to="/dashboard/applications"
          className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200"
        >
          <i className="fas fa-arrow-left mr-2"></i> Back to Applications
        </Link>
        <h1 className="text-2xl font-bold text-white flex items-center">
          <i className="fas fa-id-card text-blue-400 mr-3"></i> Application
          Details
        </h1>
      </div>

      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
              <i className="fas fa-user text-3xl text-white"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {application.company} - {application.job_title}
            </h2>
            <div className="w-24 h-1 bg-gradient mx-auto rounded-full"></div>
          </div>

          <div className="space-y-5 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
                <div className="flex items-center mb-2">
                  <i className="fas fa-user-tag text-blue-400 mr-2"></i>
                  <h3 className="text-gray-300 text-sm font-medium">Company</h3>
                </div>
                <p className="text-white text-lg ml-6">{application.company}</p>
              </div>
              <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
                <div className="flex items-center mb-2">
                  <i className="fas fa-user-tag text-blue-400 mr-2"></i>
                  <h3 className="text-gray-300 text-sm font-medium">
                    Job Title
                  </h3>
                </div>
                <p className="text-white text-lg ml-6">
                  {application.job_title}
                </p>
              </div>
            </div>

            <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
              <div className="flex items-center mb-2">
                <i className="fas fa-envelope text-blue-400 mr-2"></i>
                <h3 className="text-gray-300 text-sm font-medium">Location</h3>
              </div>
              <p className="text-white text-lg ml-6">{application.location}</p>
            </div>

            <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
              <div className="flex items-center mb-2">
                <i className="fas fa-phone text-blue-400 mr-2"></i>
                <h3 className="text-gray-300 text-sm font-medium">Link</h3>
              </div>
              <p className="text-white text-lg ml-6">{application.link}</p>
            </div>

            <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
              <div className="flex items-center mb-2">
                <i className="fas fa-phone text-blue-400 mr-2"></i>
                <h3 className="text-gray-300 text-sm font-medium">
                  Application Date
                </h3>
              </div>
              <p className="text-white text-lg ml-6">
                {new Date(application.application_date).toLocaleDateString(
                  "id-ID",
                  { day: "numeric", month: "long", year: "numeric" },
                )}
              </p>
            </div>

            <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
              <div className="flex items-center mb-2">
                <i className="fas fa-phone text-blue-400 mr-2"></i>
                <h3 className="text-gray-300 text-sm font-medium">Status</h3>
              </div>
              <p className="text-white text-lg ml-6">{application.status}</p>
            </div>

            <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
              <div className="flex items-center mb-2">
                <i className="fas fa-phone text-blue-400 mr-2"></i>
                <h3 className="text-gray-300 text-sm font-medium">Notes</h3>
              </div>
              <p className="text-white text-lg ml-6">{application.notes}</p>
            </div>
          </div>

          {/* <div className="mb-8">
            <div className="flex items-center mb-5">
              <i className="fas fa-map-marker-alt text-blue-400 mr-3"></i>
              <h3 className="text-xl font-semibold text-white">Addresses</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg border-2 border-dashed border-gray-600 shadow-md card-hover">
                <Link
                  to={`/dashboard/contacts/${id}/addresses/create`}
                  className="block h-full"
                >
                  <div className="flex flex-col items-center justify-center h-full text-center py-4">
                    <div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110">
                      <i className="fas fa-plus text-2xl text-white"></i>
                    </div>
                    <h4 className="text-lg font-semibold text-white">
                      Add Address
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
          </div> */}

          <div className="flex justify-end space-x-4">
            <Link
              to="/dashboard/applications"
              className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
            >
              <i className="fas fa-arrow-left mr-2"></i> Back
            </Link>
            <Link
              to={`/dashboard/applications/${id}/edit`}
              className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
            >
              <i className="fas fa-user-edit mr-2"></i> Edit Application
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
