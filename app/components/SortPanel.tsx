import { closestCenter, DndContext, DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { Client, SortCriterion, SortDirection } from "../utils/Types";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useCallback } from "react";
import { setLocalStorageSortCriteria } from "../utils/helperFunc";
import SortableItem from "./SortableItem";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SortPanelProps {
    sortCriteria: SortCriterion[];
    setSortCriteria: React.Dispatch<React.SetStateAction<SortCriterion[]>>;
    availableFields: (keyof Client)[];
    onApply: () => void; // Callback when Apply Sort is clicked
    onClose: () => void; // Callback to close the panel
  }
  
  const SortPanel: React.FC<SortPanelProps> = ({
      sortCriteria,
      setSortCriteria,
      availableFields,
      onApply,
      onClose
  }) => {
    const sensors = useSensors(
      useSensor(PointerSensor),
      useSensor(KeyboardSensor, {
        coordinateGetter: sortableKeyboardCoordinates,
      })
    );
  
    const handleDragEnd = useCallback((event: DragEndEvent) => {
      const { active, over } = event;
  
      if (over && active.id !== over.id) {
        setSortCriteria((items) => {
          const oldIndex = items.findIndex((item) => item.id === active.id);
          const newIndex = items.findIndex((item) => item.id === over.id);
          const newItems = arrayMove(items, oldIndex, newIndex);
          setLocalStorageSortCriteria(newItems); // Persist on drag end
          return newItems;
        });
      }
    }, [setSortCriteria]);
  
    const handleAddCriterion = () => {
      // Find the first available field not already used, or default to 'name'
      const currentFields = sortCriteria.map(c => c.field);
      const nextField = availableFields.find(f => !currentFields.includes(f)) || 'name';
      const newCriterion: SortCriterion = {
        id: `criterion-${Date.now()}-${Math.random()}`, // Simple unique ID
        field: nextField,
        direction: 'asc',
      };
      const newCriteria = [...sortCriteria, newCriterion];
      setSortCriteria(newCriteria);
      setLocalStorageSortCriteria(newCriteria); // Persist on add
    };
  
    const handleRemoveCriterion = (idToRemove: string) => {
      const newCriteria = sortCriteria.filter((c) => c.id !== idToRemove);
      setSortCriteria(newCriteria);
      setLocalStorageSortCriteria(newCriteria); // Persist on remove
    };
  
    const handleDirectionChange = (idToUpdate: string, direction: SortDirection) => {
      const newCriteria = sortCriteria.map((c) =>
        c.id === idToUpdate ? { ...c, direction } : c
      );
      setSortCriteria(newCriteria);
      setLocalStorageSortCriteria(newCriteria); // Persist on direction change
    };
  
     const handleFieldChange = (idToUpdate: string, field: keyof Client) => {
          const newCriteria = sortCriteria.map(c =>
              c.id === idToUpdate ? { ...c, field: field } : c
          );
          setSortCriteria(newCriteria);
          setLocalStorageSortCriteria(newCriteria); // Persist on field change
      };
  
    const handleClearAll = () => {
      const defaultCriteria = [{ id: `default-${Date.now()}`, field: 'createdAt' as keyof Client, direction: 'desc' as SortDirection }];
      setSortCriteria(defaultCriteria);
      setLocalStorageSortCriteria(defaultCriteria); // Persist on clear
    };
  
    return (
      <div className="absolute top-full -right-12 w-[100vw] md:w-fit md:right-0 mt-2  bg-white border border-gray-300 rounded-lg shadow-xl z-20 p-4 space-y-4">
         <div className="flex justify-between items-center mb-3 pb-2 px-2 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Sort By</h3>
              <Button
                  onClick={onClose}
                  className="p-1 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  aria-label="Close sort panel"
              >
                  <X size={20} />
              </Button>
          </div>
  
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={sortCriteria.map(c => c.id)} strategy={verticalListSortingStrategy}>
            <div className="max-h-60 overflow-y-auto pr-1 ">
               {sortCriteria.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No sort criteria added.</p>
               )}
               {sortCriteria.map((criterion) => (
                  <SortableItem
                      key={criterion.id}
                      criterion={criterion}
                      onDirectionChange={handleDirectionChange}
                      onRemove={handleRemoveCriterion}
                      availableFields={availableFields}
                      onFieldChange={handleFieldChange}
                  />
               ))}
            </div>
          </SortableContext>
        </DndContext>
  
        <Button
          onClick={handleAddCriterion}
          className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded text-sm text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors"
          disabled={sortCriteria.length >= availableFields.length} // Disable if all fields are used
        >
          <Plus size={16} className="mr-1" /> Add Sort Criterion
        </Button>
  
        <div className="flex justify-between items-center pt-3 border-t border-gray-200 mt-4">
          <Button
            onClick={handleClearAll}
            className="px-4 py-1.5 text-sm  hover:text-red-600 hover:bg-red-50 rounded focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
          >
            Clear all
          </Button>
          <Button
            onClick={onApply} // Use the onApply callback
            className="px-5 py-1.5  hover:text-white font-medium rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800 transition-colors"
          >
            Apply Sort
          </Button>
        </div>
      </div>
    );
  };

  export default SortPanel
  