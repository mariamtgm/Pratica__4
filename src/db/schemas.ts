import { ObjectId } from "https://deno.land/x/mongo@v0.31.1/mod.ts";
import { Car, Seller, Concessionaire } from "../types.ts";

export type CarSchema = Car & {
  _id: ObjectId;
};

export type SellerSchema = Seller & {
  _id: ObjectId;
};

export type ConcessionaireSchema = Concessionaire & {
  _id: ObjectId;
};