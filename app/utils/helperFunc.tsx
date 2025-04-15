import { Client, SortCriterion } from "./Types";
const DEFAULT_SORT_CRITERIA: SortCriterion[] = [
    { id: `default-${Date.now()}`, field: 'createdAt', direction: 'desc' }
];

export const getLocalStorageSortCriteria = (): SortCriterion[] => {
    // Return default if localStorage is not available (SSR)
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      console.log("localStorage not available (SSR?), returning default sort.");
      return DEFAULT_SORT_CRITERIA;
    }
    try {
      const saved = localStorage.getItem('clientSortCriteria');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Basic validation
        if (Array.isArray(parsed) && parsed.every(item => item.id && item.field && item.direction)) {
          console.log("Loaded sort criteria from localStorage:", parsed);
          return parsed;
        }
      }
    } catch (error) {
      console.error("Failed to load/parse sort criteria from localStorage:", error);
    }
    // Return default if nothing valid found in localStorage
    console.log("No valid sort criteria in localStorage, returning default.");
    return DEFAULT_SORT_CRITERIA;
  };
  
  // **Updated**: Checks for localStorage availability before accessing
 export const setLocalStorageSortCriteria = (criteria: SortCriterion[]) => {
    // Only save if localStorage is available (Client-side)
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        try {
          localStorage.setItem('clientSortCriteria', JSON.stringify(criteria));
          console.log("Saved sort criteria to localStorage:", criteria);
        } catch (error) {
          console.error("Failed to save sort criteria to localStorage:", error);
        }
    } else {
        console.log("Skipping localStorage save (SSR?).");
    }
  };
  
 export const sortClients = (clients: Client[], criteria: SortCriterion[]): Client[] => {
    if (!criteria.length) return clients;
  
    return [...clients].sort((a, b) => {
      for (const { field, direction } of criteria) {
        const valA = a[field];
        const valB = b[field];
  
        let comparison = 0;
  
        if (typeof valA === 'string' && typeof valB === 'string') {
          if (field === 'createdAt' || field === 'updatedAt') {
            // Date comparison
            comparison = new Date(valA).getTime() - new Date(valB).getTime();
          } else {
            // String comparison (case-insensitive)
            comparison = valA.toLowerCase().localeCompare(valB.toLowerCase());
          }
        } else if (typeof valA === 'number' && typeof valB === 'number') {
          // Number comparison (though no number fields in this example)
          comparison = valA - valB;
        }
        // Add more type comparisons if needed
  
        if (comparison !== 0) {
          return direction === 'asc' ? comparison : -comparison;
        }
      }
      return 0; // If all criteria result in equality, maintain original relative order
    });
  };