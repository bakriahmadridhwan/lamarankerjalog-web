import {
  useEffect,
  useState,
  type SubmitEvent as ReactSubmitEvent,
} from "react";
import { Link } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";
import {
  APPLICATION_STATUSES,
  applicationDelete,
  applicationList,
  type Application,
  type ApplicationStatus,
} from "../../lib/api/ApplicationAPI";

export default function ApplicationList() {
  const [token] = useLocalStorage("token", "");
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState<ApplicationStatus | "">("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [applications, setApplications] = useState<Application[]>([]);
  const [reload, setReload] = useState(false);

  function getPages() {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  async function handleSearchApplications(
    e: ReactSubmitEvent<HTMLFormElement>,
  ) {
    e.preventDefault();
    setPage(1);
    setReload(!reload);
  }

  async function handlePageChange(page: number) {
    setPage(page);
    setReload(!reload);
  }

  // async function fetchApplications() {
  //   const response = await applicationList(token ?? "", {
  //     q,
  //     location,
  //     status,
  //     page,
  //   });
  //   const responseBody = await response.json();
  //   console.log(responseBody);

  //   if (response.status === 200) {
  //     setApplications(responseBody.data);
  //     setTotalPage(responseBody.paging.total_page);
  //   } else {
  //     await alertError(responseBody.errors);
  //   }
  // }

  async function handleApplicationDelete(id: number) {
    if (
      !(await alertConfirm("Are you sure you want to delete this applicaiton?"))
    ) {
      return;
    }

    const response = await applicationDelete(token ?? "", id);
    const responseBody = await response.json();
    console.log(responseBody);

    if (response.status === 200) {
      await alertSuccess("Application deleted successfully");
      setReload(!reload);
    } else {
      await alertError(responseBody.errors);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function load() {
      const response = await applicationList(token ?? "", {
        q,
        location,
        status,
        page,
      });
      const responseBody = await response.json();
      if (ignore) return;

      if (response.status === 200) {
        setApplications(responseBody.data);
        setTotalPage(responseBody.paging.total_page);
      } else {
        await alertError(responseBody.errors);
      }
    }

    load();

    return () => {
      ignore = true;
    };
    // Sengaja hanya dipicu `reload`, supaya mengetik di form tidak langsung fetch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reload]);

  useEffectOnce(() => {
    const toggleButton = document.getElementById("toggleSearchForm");
    const searchFormContent = document.getElementById("searchFormContent");
    const toggleIcon = document.getElementById("toggleSearchIcon");

    if (!toggleButton || !searchFormContent || !toggleIcon) return;

    // Add transition for smooth animation
    searchFormContent.style.transition =
      "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
    searchFormContent.style.overflow = "hidden";
    searchFormContent.style.maxHeight = "0px";
    searchFormContent.style.opacity = "0";
    searchFormContent.style.marginTop = "0";

    const toggleSearchForm = () => {
      if (searchFormContent.style.maxHeight !== "0px") {
        // Hide the form
        searchFormContent.style.maxHeight = "0px";
        searchFormContent.style.opacity = "0";
        searchFormContent.style.marginTop = "0";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
      } else {
        // Show the form
        searchFormContent.style.maxHeight =
          searchFormContent.scrollHeight + "px";
        searchFormContent.style.opacity = "1";
        searchFormContent.style.marginTop = "1rem";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
      }
    };

    toggleButton.addEventListener("click", toggleSearchForm);

    return () => {
      toggleButton.removeEventListener("click", toggleSearchForm);
    };
  });

  return (
    <>
      <div className="flex items-center mb-6">
        <i className="fas fa-users text-blue-400 text-2xl mr-3"></i>
        <h1 className="text-2xl font-bold text-white">My Applications</h1>
      </div>

      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fas fa-search text-blue-400 mr-3"></i>
            <h2 className="text-xl font-semibold text-white">
              Search Applications
            </h2>
          </div>
          <button
            type="button"
            id="toggleSearchForm"
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200"
          >
            <i
              className="fas fa-chevron-down text-lg"
              id="toggleSearchIcon"
            ></i>
          </button>
        </div>
        <div id="searchFormContent" className="mt-4">
          <form onSubmit={handleSearchApplications}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="search_q"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Company and Job Title
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-500"></i>
                  </div>
                  <input
                    type="text"
                    id="search_q"
                    name="search_q"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by company or job title"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="search_location"
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
                    id="search_location"
                    name="search_location"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="search_status"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Status
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-phone text-gray-500"></i>
                  </div>
                  <select
                    id="search_status"
                    name="search_status"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    value={status}
                    onChange={(e) =>
                      setStatus(e.target.value as ApplicationStatus | "")
                    }
                  >
                    <option value="">All statuses</option>
                    {APPLICATION_STATUSES.map((s) => (
                      <option key={s} value={s} className="capitalize">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-5 text-right">
              <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
              >
                <i className="fas fa-search mr-2"></i> Search
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
          <Link
            to="/dashboard/applications/create"
            className="block p-6 h-full"
          >
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                <i className="fas fa-user-plus text-3xl text-white"></i>
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Create New Application
              </h2>
              <p className="text-gray-300">
                Add a new application to your list
              </p>
            </div>
          </Link>
        </div>

        {applications.map((application) => (
          <div
            key={application.id}
            className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
          >
            <div className="p-6">
              <Link
                to={`/dashboard/applications/${application.id}`}
                className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">
                    {application.company} - {application.job_title}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-300 ml-2">
                  <p className="flex items-center">
                    <i className="fas fa-user-tag text-gray-500 w-6"></i>
                    <span className="font-medium w-24">Company:</span>
                    <span>{application.company}</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-user-tag text-gray-500 w-6"></i>
                    <span className="font-medium w-24">Job Title:</span>
                    <span>{application.job_title}</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-envelope text-gray-500 w-6"></i>
                    <span className="font-medium w-24">Location:</span>
                    <span>{application.location || "-"}</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-link text-gray-500 w-6"></i>
                    <span className="font-medium w-24">Link:</span>
                    {application.link ? (
                      <span className="font-medium w-24">Open posting</span>
                    ) : (
                      <span>-</span>
                    )}
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-phone text-gray-500 w-6"></i>
                    <span className="font-medium w-24">Applied:</span>
                    <span>
                      {new Date(
                        application.application_date,
                      ).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </p>

                  <p className="flex items-center">
                    <i className="fas fa-phone text-gray-500 w-6"></i>
                    <span className="font-medium w-24">Status:</span>
                    <span>{application.status}</span>
                  </p>
                </div>
              </Link>
              <div className="mt-4 flex justify-end space-x-3">
                <Link
                  to={`/dashboard/applications/${application.id}/edit`}
                  className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                >
                  <i className="fas fa-edit mr-2"></i> Edit
                </Link>
                <button
                  onClick={() => handleApplicationDelete(application.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                >
                  <i className="fas fa-trash-alt mr-2"></i> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
          {page > 1 && (
            <a
              href="#"
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              <i className="fas fa-chevron-left mr-2"></i> Previous
            </a>
          )}
          {getPages().map((value) => {
            if (value === page) {
              return (
                <a
                  key={value}
                  href="#"
                  onClick={() => handlePageChange(value)}
                  className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md"
                >
                  {value}
                </a>
              );
            } else {
              return (
                <a
                  key={value}
                  href="#"
                  onClick={() => handlePageChange(value)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200"
                >
                  {value}
                </a>
              );
            }
          })}
          {page < totalPage && (
            <a
              href="#"
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center"
            >
              Next <i className="fas fa-chevron-right ml-2"></i>
            </a>
          )}
        </nav>
      </div>
    </>
  );
}
