import { carsCollection, ConcessionaireCollection, sellersCollection } from "../db/mongo.ts";
import { ObjectId } from "mongo";
import { Car, Concessionaire, Seller } from "../types.ts";

export const Query = {
  getCars: async (_: unknown, args: { min: number, max:number}): Promise<Car[]> => {
    try {
      const cars = await carsCollection.find({ $and: [{ price: {$gte: args.min, $lte: args.max}}]}).toArray();
      return cars.map((car) => ({ ...car}));
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  getCar: async (_: unknown, args: { id: string }): Promise<Car | null> => { 
    try {
      const car = await carsCollection.findOne({ _id: new ObjectId(args.id) });
      if (car) return { ...car, id: car._id.toString() };
      else return null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  getSellers: async (_: unknown, args: { name: string }): Promise<Seller[]> => {
    try {
      const sellers = await sellersCollection.find({name: args.name}).toArray();
      return sellers.map((seller) => ({ ...seller}));
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  getSeller: async (_: unknown, args: { id: string }): Promise<Seller | null> => { 
    try {
      const seller = await sellersCollection.findOne({ _id: new ObjectId(args.id)});
      if (seller) return { ...seller, id: seller._id.toString() };
      else return null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    } //id: string;
    
  },
  getConcessionaires: async (_: unknown, args: { id: string, name: string, location: string,  cif: string}): Promise<Concessionaire[]> => {
    try {
      const concessionaire = await ConcessionaireCollection.find({id: args.id, name: args.name, location: args.location, cif: args.cif}).toArray();
      return concessionaire.map((concessionaire) => ({ ...concessionaire}));
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  getConcessionaire: async (_: unknown, args: { id: string }): Promise<Concessionaire | null> => { 
    try {
      const concessionaire = await ConcessionaireCollection.findOne({ _id: new ObjectId(args.id) });
      if (concessionaire) return { ...concessionaire, id: concessionaire._id.toString() };
      else return null;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
};



