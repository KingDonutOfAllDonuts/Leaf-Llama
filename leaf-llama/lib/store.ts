import { atomWithStorage } from "jotai/utils";

export const cartAtom = atomWithStorage("cart", [])

export const ordersAtom = atomWithStorage("orders", [])

export const vegetableAtom = atomWithStorage("vegetable", '')