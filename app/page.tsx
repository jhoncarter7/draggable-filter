"use client";
import { useEffect, useMemo, useState } from "react";
import { Client, SortCriterion } from "./utils/Types";
import { AVAILABLE_SORT_FIELDS, MOCK_CLIENTS } from "./utils/MockData";
import { getLocalStorageSortCriteria, sortClients } from "./utils/helperFunc";
import { ArrowUpDown, Plus } from "lucide-react";
import SortPanel from "./components/SortPanel";
import ClientTable from "./components/ClientTable";
import { Button } from "@/components/ui/button";

type FilterType = "All" | "Individual" | "Company";

const Home: React.FC = () => {
  // --- State and Logic ---
  const [clients] = useState<Client[]>(MOCK_CLIENTS);
  const [sortCriteria, setSortCriteria] = useState<SortCriterion[]>(
    getLocalStorageSortCriteria
  );
  const [isSortPanelOpen, setIsSortPanelOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All");

  // Memoize sorted clients
  const sortedClients = useMemo(() => {
    console.log("Sorting clients with criteria:", sortCriteria);
    const filteredClients = clients.filter((client) => {
      if (selectedFilter === "All") return true;
      return client.clientType === selectedFilter;
    });
    return sortClients(filteredClients, sortCriteria);
  }, [clients, sortCriteria, selectedFilter]);

  // Effect to load criteria from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setSortCriteria(getLocalStorageSortCriteria());
    }
  }, []);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sortPanel = document.getElementById("sort-panel-container");
      const sortButton = document.getElementById("sort-button");
      if (
        isSortPanelOpen &&
        sortPanel &&
        !sortPanel.contains(event.target as Node) &&
        sortButton &&
        !sortButton.contains(event.target as Node)
      ) {
        setIsSortPanelOpen(false);
      }
    };
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isSortPanelOpen]);

  const toggleSortPanel = () => {
    setIsSortPanelOpen((prev) => !prev);
  };

  const handleApplySort = () => {
    setIsSortPanelOpen(false);
    console.log("Applied sort criteria:", sortCriteria);
  };

  const getActiveSortCount = () => sortCriteria.length;

  // Handler for changing the filter (used by both select and buttons)
  const handleFilterChange = (filter: FilterType) => {
    setSelectedFilter(filter);
    console.log("Selected Filter:", filter);
  };

  // --- Render Logic ---
  return (
    <div className="p-2 sm:p-6 md:p-10 font-sans bg-gray-50 min-h-screen  mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Clients</h1>

      {/* --- Header / Controls --- */}
      <div className="flex flex-row justify-between items-center mb-4 space-y-4 ">
        {/* Filters Section */}
        <div className="flex items-center mb-0  space-x-2 flex-wrap gap-y-2">
          {/* **Updated**: Use <select> for small/medium screens */}
          <div className="block lg:hidden">
          
            {/* Visible on screens smaller than lg */}
            <label htmlFor="filter-select" className="sr-only">
              Filter by Type
            </label>
            {/* Added label for accessibility */}
            <select
              id="filter-select"
              value={selectedFilter}
              onChange={(e) => handleFilterChange(e.target.value as FilterType)}
              // Added Tailwind classes for styling to match buttons/inputs
              className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500 bg-white h-[36px]" // Matched height approx to size="sm" button
            >
              <option value="All">All</option>
              <option value="Individual">Individual</option>
              <option value="Company">Company</option>
            </select>
          </div>

          {/* **Updated**: Individual buttons for large screens (logic remains same) */}
          <div className="hidden lg:flex items-center space-x-2">
            {" "}
            {/* Visible on lg screens and up */}
            <Button
              variant={selectedFilter === "All" ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("All")}
            >
              All
            </Button>
            <Button
              variant={
                selectedFilter === "Individual" ? "secondary" : "outline"
              }
              size="sm"
              onClick={() => handleFilterChange("Individual")}
            >
              Individual
            </Button>
            <Button
              variant={selectedFilter === "Company" ? "secondary" : "outline"}
              size="sm"
              onClick={() => handleFilterChange("Company")}
            >
              Company
            </Button>
          </div>
        </div>

        {/* Actions Section (remains the same) */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search..."
            className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500 w-full sm:w-32 md:w-auto"
          />
          {/* Sort Button & Panel Trigger */}
          <div className="relative" id="sort-panel-container">
            <button
              id="sort-button"
              onClick={toggleSortPanel}
              className="relative flex items-center px-3 sm:px-4 py-1.5 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 whitespace-nowrap"
              aria-label="Sort clients"
            >
              <ArrowUpDown
                size={16}
                className="text-gray-500 mr-0 sm:mr-1.5 flex-shrink-0"
              />
              <span className="hidden sm:inline">Sort</span>
              {getActiveSortCount() > 0 && (
                <span className="absolute -top-1.5 -right-1.5 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  {getActiveSortCount()}
                </span>
              )}
            </button>
            {isSortPanelOpen && (
              <SortPanel
                sortCriteria={sortCriteria}
                setSortCriteria={setSortCriteria}
                availableFields={AVAILABLE_SORT_FIELDS}
                onApply={handleApplySort}
                onClose={() => setIsSortPanelOpen(false)}
              />
            )}
          </div>
          {/* Add Client Button */}
          <button
            className="flex items-center px-3 sm:px-4 py-1.5 bg-gray-800 text-white text-sm font-medium rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 whitespace-nowrap"
            aria-label="Add new client"
          >
            <Plus size={16} className="mr-0 sm:mr-1 flex-shrink-0" />
            <span className="hidden sm:inline">Add Client</span>
          </button>
        </div>
      </div>

      {/* --- Client Table --- */}
      <div className="overflow-x-auto shadow border border-gray-200 rounded-lg">
        {/* Pass filtered and sorted clients to the table */}
        <ClientTable clients={sortedClients} />
      </div>
    </div>
  );
};

export default Home;
