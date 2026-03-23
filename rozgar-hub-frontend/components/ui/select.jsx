"use client";

import { useState } from "react";

export function Select({ children, value, onValueChange }) {
  return (
    <div className="relative">
      {children({ value, onValueChange })}
    </div>
  );
}

export function SelectTrigger({ children }) {
  return (
    <div className="border border-gray-300 rounded-md px-3 py-2 cursor-pointer bg-white">
      {children}
    </div>
  );
}

export function SelectValue({ placeholder, value }) {
  return (
    <span className="text-gray-700">
      {value || placeholder}
    </span>
  );
}

export function SelectContent({ children }) {
  return (
    <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md">
      {children}
    </div>
  );
}

export function SelectItem({ value, onSelect, children }) {
  return (
    <div
      onClick={() => onSelect(value)}
      className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
    >
      {children}
    </div>
  );
}
