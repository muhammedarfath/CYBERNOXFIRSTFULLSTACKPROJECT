import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import React, { useState, useMemo } from "react";
import {
  MdClose,
  MdSearch,
  MdCheckBox,
  MdCheckBoxOutlineBlank,
} from "react-icons/md";

function Option({
  openModal,
  modalTitle,
  options,
  selectedValue,
  setSelectedValue,
  handleSave,
  setOpenModal,
}) {
  const [search, setSearch] = useState("");

  const filteredOptions = useMemo(() => {
    return options.filter((option) =>
      option.status.toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const handleToggle = (status) => {
    const updatedValues = selectedValue.includes(status)
      ? selectedValue.filter((v) => v !== status)
      : [...selectedValue, status];
    setSelectedValue(updatedValues);
  };

  const onClose = () => {
    setOpenModal(false);
  };

  const onSave = () => {
    handleSave();
    onClose();
  };

  if (!openModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-black text-white rounded-full "
        >
          <MdClose className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="p-6">
          <h2 className="text-xl font-semibold">{modalTitle}</h2>
        </div>

        {/* Selected Values */}
        {selectedValue.length > 0 && (
          <div className="px-6 flex flex-wrap gap-2">
            {selectedValue.map((value) => (
              <div
                key={value}
                className="inline-flex items-center bg-button text-white px-4 py-2 rounded-full text-sm"
              >
                {value}
                <button
                  onClick={() => handleToggle(value)}
                  className="ml-2 hover:opacity-75"
                >
                  <MdClose className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Search */}
        <div className="p-6">
          <div className="relative">
            <MdSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-lg border border-gray focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="mt-4 space-y-4">
            {filteredOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center space-x-3 cursor-pointer hover:bg-button hover:bg-opacity-60 hover:text-white p-2 rounded-lg"
                onClick={() => handleToggle(option.status)} // Ensure toggle happens when clicked
              >
                <div className="flex-shrink-0">
                  {selectedValue.includes(option.status) ? (
                    <div className="w-6 h-6 border-2 border-black rounded flex items-center justify-center bg-black">
                      <MdCheckBox className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 border-2 border-black rounded">
                      <MdCheckBoxOutlineBlank className="h-4 w-4 text-black" />
                    </div>
                  )}
                </div>
                <span className="text-gray-700">{option.status}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="p-6 flex justify-between items-center border-t">
          <button onClick={onClose} className="px-6 py-2 text-black">
            Back
          </button>
          <button
            onClick={onSave}
            className="px-8 py-2 bg-button text-white rounded-full hover:bg-emerald-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default Option;
