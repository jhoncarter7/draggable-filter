import { GripVertical, X } from "lucide-react";
import { Client, SortCriterion, SortDirection } from "../utils/Types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FIELD_LABELS } from "../utils/MockData";
import { Button } from "@/components/ui/button";
interface SortableItemProps {
    criterion: SortCriterion;
    onDirectionChange: (id: string, direction: SortDirection) => void;
    onRemove: (id: string) => void;
    availableFields: (keyof Client)[];
    onFieldChange: (id: string, field: keyof Client) => void;
  }
  
 const SortableItem: React.FC<SortableItemProps> = ({
      criterion,
      onDirectionChange,
      onRemove,
      availableFields,
      onFieldChange
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: criterion.id });
  
    const style = {
      transform: CSS.Transform.toString(transform),
      transition: transition || undefined,
      zIndex: isDragging ? 10 : undefined,
      opacity: isDragging ? 0.8 : 1,
    };
  
    const handleDirectionClick = (newDirection: SortDirection) => {
        if (criterion.direction !== newDirection) {
            onDirectionChange(criterion.id, newDirection);
        }
    };
  
    const handleFieldSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onFieldChange(criterion.id, event.target.value as keyof Client);
    };
  
    const getDirectionButtonClasses = (dir: SortDirection) => {
        const base = "px-3 py-1 text-xs rounded transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500";
        const active = "bg-blue-100 text-blue-700 font-medium";
        const inactive = "bg-gray-100 text-gray-600 hover:bg-gray-200";
        return `${base} ${criterion.direction === dir ? active : inactive}`;
    };
  
    const getDirectionLabel = (field: keyof Client, direction: SortDirection): string => {
          if (field === 'createdAt' || field === 'updatedAt') {
              return direction === 'desc' ? 'Newest to Oldest' : 'Oldest to Newest';
          }
          return direction === 'asc' ? 'A - Z' : 'Z - A';
      };
  
  
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        className="flex items-center space-x-2 p-2 bg-white rounded border border-gray-200 mb-2 shadow-sm"
      >
        {/* Drag Handle */}
        <Button
          {...listeners}
          className="p-1 text-gray-500 hover:bg-gray-100 rounded cursor-grab focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Drag to reorder sort criterion"
        >
          <GripVertical size={16} />
        </Button>
  
        {/* Field Selector */}
         <select
              value={criterion.field}
              onChange={handleFieldSelectChange}
              className="p-1 border  border-gray-300 text-black rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
              {availableFields.map(field => (
                  <option key={field} value={field} className="text-black">{FIELD_LABELS[field]}</option>
              ))}
          </select>
  
  
        {/* Direction Toggles */}
        <div className="flex items-center space-x-1 border border-gray-300 rounded p-0.5">
           <Button
              onClick={() => handleDirectionClick('asc')}
              className={getDirectionButtonClasses('asc')}
              aria-pressed={criterion.direction === 'asc'}
           >
              ↑ {getDirectionLabel(criterion.field, 'asc')}
          </Button>
          <Button
              onClick={() => handleDirectionClick('desc')}
              className={getDirectionButtonClasses('desc')}
              aria-pressed={criterion.direction === 'desc'}
          >
              ↓ {getDirectionLabel(criterion.field, 'desc')}
          </Button>
        </div>
  
        {/* Remove Button */}
        <Button
          onClick={() => onRemove(criterion.id)}
          className="ml-auto p-1 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
          aria-label="Remove sort criterion"
        >
          <X size={16} />
        </Button>
      </div>
    );
  };

  export default SortableItem