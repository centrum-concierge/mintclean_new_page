// Single source of truth for the quote form's "Type of Service" options —
// the form, server validation, and email templates all read labels from here.
export const SERVICE_TYPES = [
  { value: "janitorial-caretaker", label: "Janitorial and Caretaker" },
  { value: "snow-removal-salting", label: "Snow removal and Salting" },
] as const;

export type ServiceType = (typeof SERVICE_TYPES)[number]["value"];

export function serviceTypeLabel(value: string): string | undefined {
  return SERVICE_TYPES.find((type) => type.value === value)?.label;
}
