import { useState } from "react";

const useSelectionDelete = () => {
  const [toDelete, setToDelete] = useState([]);

  const handleDeleteSelect = (e, id) => {
    if (e.target.checked) {
      const newDeletes = [...toDelete];
      newDeletes.push(id);
      setToDelete(newDeletes);
    } else {
      const newDeletes = toDelete.filter(u => u !== id);
      setToDelete(newDeletes);
    }
  };

  return [toDelete, handleDeleteSelect];
};

export default useSelectionDelete;
