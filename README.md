# React Multi-Sort Table with Drag & Drop Priority

This project demonstrates a client list table UI built with React that supports multi-column sorting with drag-and-drop prioritization for sort criteria, similar to advanced data grid interfaces. It also includes basic filtering and responsive design adjustments.

![image](https://github.com/user-attachments/assets/a45f44d5-c615-4374-9b13-e7f525790417)

## Features

* **Client Data Display:** Renders client information in a clear table format.
* **Multi-Column Sorting:** Sort data based on multiple criteria simultaneously (e.g., sort by Status DESC, then by Name ASC).
* **Drag & Drop Sort Priority:** Users can visually reorder sort criteria in a dedicated panel to define their priority.
* **Ascending/Descending Toggle:** Each sort criterion can be toggled between ascending and descending order.
* **Sort Persistence:** The defined sort criteria and their order are saved to `localStorage`, persisting across browser sessions.
* **Client-Side Filtering:** Basic filtering by client type ('All', 'Individual', 'Company').
* **Responsive Design:** The header controls adapt to different screen sizes, using a dropdown/select for filters on smaller screens and full buttons/inputs on larger ones. The table itself includes horizontal scrolling for smaller viewports.
* **SSR Friendly:** Handles `localStorage` access safely to prevent errors during server-side rendering (relevant for frameworks like Next.js).

## Tech Stack

* **React:** Core UI library.
* **TypeScript:** For static typing and improved developer experience.
* **Tailwind CSS:** Utility-first CSS framework for styling and responsiveness.
* **@dnd-kit:** Modern, lightweight library suite for drag-and-drop functionality (`core`, `sortable`, `utilities`).
* **lucide-react:** Icon library.
* **(Implied) shadcn/ui:** UI components like `Button` are used (assumes setup in the target project).
* **Browser APIs:** `localStorage` for persistence.

## Setup and Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Configure `shadcn/ui` (if not already done):**
    * This project assumes `shadcn/ui` components (like `Button`, potentially `DropdownMenu` if you revert) are available. Follow the [shadcn/ui documentation](https://ui.shadcn.com/docs/installation) to set it up for your specific framework (Next.js, Vite, etc.) if needed.

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    Open [http://localhost:3000](http://localhost:3000) (or your configured port) in your browser.

## Workflow and Functionality

1.  **Viewing Data:** The main view displays the list of clients in a table.
2.  **Filtering:**
    * On large screens (`lg` and up), click the "All", "Individual", or "Company" buttons to filter the client list. The active filter button will have a different style.
    * On smaller screens, use the `<select>` dropdown menu (initially showing the active filter) to choose the desired filter type.
3.  **Sorting:**
    * Click the "Sort" button in the header controls to open the "Sort By" panel.
    * **Adding Criteria:** Click "Add Sort Criterion" to add a new sorting rule. Select the desired field (e.g., "Client Name", "Created At") from the dropdown.
    * **Changing Direction:** Click the direction buttons (e.g., "A - Z" / "Z - A", "Newest to Oldest" / "Oldest to Newest") next to a criterion to toggle its sort direction.
    * **Changing Priority:** Click and drag the drag handle (:::) on the left of a sort criterion up or down to change its priority relative to other criteria. Criteria higher in the list are applied first.
    * **Removing Criteria:** Click the 'X' button on the right of a criterion to remove it.
    * **Clearing All:** Click "Clear all" to remove all criteria and reset to the default sort (usually by "Created At").
    * **Applying:** Click "Apply Sort" (or simply click outside the panel) to close the panel. The table data updates automatically as you modify the criteria.
4.  **Persistence:** Your sorting configuration (which fields, their directions, and their order) is automatically saved in your browser's `localStorage` and will be reloaded the next time you visit the page.


