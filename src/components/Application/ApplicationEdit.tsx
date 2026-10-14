import { Link, useParams } from "react-router";
import { useState, type SubmitEvent as ReactSubmitEvent } from "react";
import {
  APPLICATION_STATUSES,
  applicationDetail,
  applicationUpdate,
  type ApplicationStatus,
} from "../../lib/api/ApplicationAPI";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertError, alertSuccess } from "../../lib/alert.js";

export default function ApplicationEdit() {
  const [token] = useLocalStorage("token", "");
  const { id } = useParams();
  const numbericId = Number(id);

  const [company, setCompany] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [link, setLink] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [status, setStatus] = useState<ApplicationStatus>("applied");
  const [notes, setNotes] = useState("");

  async function fetchApplication() {
    const response = await applicationDetail(token ?? "", numbericId);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      setCompany(responseBody.data.company ?? "");
      setJobTitle(responseBody.data.job_title ?? "");
      setLocation(responseBody.data.location ?? "");
      setLink(responseBody.data.link ?? "");
      setApplicationDate(
        (responseBody.data.application_date ?? "").slice(0, 10),
      );
      setStatus(responseBody.data.status);
      setNotes(responseBody.data.notes ?? "");
    } else {
      await alertError(responseBody.errors);
    }
  }

  async function handleSubmit(e: ReactSubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const response = await applicationUpdate(token ?? "", numbericId, {
      company,
      job_title: jobTitle,
      location: location || undefined,
      link: link || undefined,
      application_date: applicationDate,
      status,
      notes: notes || undefined,
    });
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Application updated successfully");
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffectOnce(() => {
    fetchApplication().then(() =>
      console.log("Application detail fetched successfully"),
    );
  });

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
          <i className="fas fa-user-edit text-blue-400 mr-3"></i> Edit
          Application
        </h1>
      </div>

      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label
                  htmlFor="company"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Company
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user-tag text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter company"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="job_title"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Job Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user-tag text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    id="job_title"
                    name="job_title"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Enter job title"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="location"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-envelope text-gray-500"></i>
                </div>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="link"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Link
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-phone text-gray-500"></i>
                </div>
                <input
                  type="url"
                  id="link"
                  name="link"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="application_date"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Application Date
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user-tag text-gray-500"></i>
                </div>
                <input
                  type="date"
                  id="application_date"
                  name="application_date"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter application date"
                  required
                  value={applicationDate}
                  onChange={(e) => setApplicationDate(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="status"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Status
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user-tag text-gray-500"></i>
                </div>
                <select
                  id="status"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as ApplicationStatus)
                  }
                >
                  {APPLICATION_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-5">
              <label
                htmlFor="notes"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                Notes
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-book text-gray-500"></i>
                </div>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  placeholder="Enter notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                to="/dashboard/applications"
                className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md"
              >
                <i className="fas fa-times mr-2"></i> Cancel
              </Link>
              <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center"
              >
                <i className="fas fa-save mr-2"></i> Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
