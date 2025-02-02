import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
export const navbarAtom = atom(true);
export const cartAtom = atomWithStorage("cart", []);

export const ordersAtom = atomWithStorage("orders", []);

export const vegetableAtom = atomWithStorage("vegetable", "");
