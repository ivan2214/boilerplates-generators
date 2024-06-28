import {type ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const defaultOptions = {
  style: "currency",
  currency: "ARS",
};

export function formatPrice({
  locales = "es-AR",
  options = defaultOptions,
}: {
  locales: Intl.LocalesArgument;
  options: Intl.NumberFormatOptions;
}) {
  return new Intl.NumberFormat(locales, options).format;
}
