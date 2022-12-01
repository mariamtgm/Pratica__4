import { carsCollection, sellersCollection, ConcessionaireCollection } from "../db/mongo.ts";
import { Car, Concessionaire, Seller } from "../types.ts";

export const Mutation = {
  createCar: async (
    _: unknown,
    args: { plate: string; brand: string; seats: number; price: number }
  ): Promise<Car> => {
    try {

      const exists = await carsCollection.findOne({ plate: args.plate });
      if (exists) {
        throw new Error("Car already exists");
      }

      console.log('coche nuevo')
      const car = await carsCollection.insertOne({
        plate: args.plate,
        brand: args.brand,
        seats: args.seats,
        price: args.price,
        id: ""
      });
      console.log('insertado', car);
      return {
        id: car.toString(),
        plate: args.plate,
        brand: args.brand,
        seats: args.seats,
        price: args.price,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  createSeller: async (
    _: unknown,
    args: { id: string; name: string; dni: string; }
  ): Promise<Seller> => {
    try {
      const exists = await sellersCollection.findOne({ dni: args.dni });
      if (exists) {
        throw new Error("Seller already exists");
      }

      const seller = await sellersCollection.insertOne({
        name: args.name,
        dni: args.dni,
        id: "",
      });
      return {
        id: seller.toString(),
        name: args.name,
        dni: args.dni,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  createConcessionaire: async (
    _: unknown,
    args: { id: string; name: string; location: string; cif: string; }
  ): Promise<Concessionaire> => {
    try {
      const exists = await ConcessionaireCollection.findOne({ cif: args.cif });
      if (exists) {
        throw new Error("Concessionaire already exists");
      }

      const concessionaire = await ConcessionaireCollection.insertOne({
        name: args.name,
        location: args.location,
        id: "",
        cif: args.cif
      });
      return {
        id: concessionaire.toString(),
        name: args.name,
        location: args.location,
        cif: args.cif
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  addCar: async (
    _: unknown,
    args: { plate: string; sellerId: string }
  ): Promise<Car> => {
    try {

      const exists = await carsCollection.findOne({ plate: args.plate });
      if (!exists) {
        throw new Error("Car does not exists");
      }

      console.log('coche nuevo')
      const car = await carsCollection.updateOne({ plate: args.plate },
        {$set: {
          sellerId: args.sellerId
        }});
      console.log('insertado', car);
      return {
        ...exists,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
  addSeller: async (
    _: unknown,
    args: { dni: string; concessionaireId: string }
  ): Promise<Seller> => {
    try {

      const exists = await sellersCollection.findOne({ dni: args.dni });
      if (!exists) {
        throw new Error("Seller does not exists");
      }

      console.log('vendedor nuevo')
      const seller = await sellersCollection.updateOne({ dni: args.dni },
        {$set: {
          concessionaireId: args.concessionaireId
        }});
      console.log('insertado', seller);
      return {
        ...exists,
      };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  },
};

