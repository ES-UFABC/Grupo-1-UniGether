// import * as Yup from "yup";

// import { Op } from 'sequelize'
// import Pet from '../models/Pets';
// import User from '../models/Users';
// import { userId } from '../middlewares/auth'

// class PetController {

//     async index(req, res) {
//         const user = await User.findByPk(req.userId, {
//             include: { association: 'pet' }
//         });

//         if (!user) {
//             res.status(400).json({ error: "Usuário não existe" })
//         }

//         return res.json(user)
//     }

//     async store(req, res) {

//         const { name, age, city, size, gender, breed, weight, vaccine, castration, microchip, url, description } = req.body;

//         let user_id = req.userId;

//         const user = await User.findByPk(req.userId);

//         if (!user) {
//             return res.status(400).json({ error: "Usuario não existe" })
//         }

//         const pet = await Pet.create({
//             name,
//             age,
//             city,
//             size,
//             gender,
//             breed,
//             weight,
//             vaccine,
//             castration,
//             microchip,
//             url,
//             description,
//             user_id
//         })

//         return res.json({
//             name,
//             age,
//             city,
//             size,
//             gender,
//             breed,
//             weight,
//             vaccine,
//             castration,
//             microchip,
//             url,
//             description
//         });
//     };

//     async findAllPets(req, res) {

//         const pets = await Pet.findAll({ where: null });
//         if (pets.length < 1)
//             return res.json({ message: "Nenhum pet foi cadastrado." });
//         return res.json(pets);
//     }

//     async findPetById(req, res) {
//         const pet = await Pet.findOne({ where: { id: req.params.id } });

//         if (!pet) {
//             return res.status(400).json({ error: "Pet não encontrado!" });
//         }

//         return res.status(200).json(pet);
//     }
// async update(req, res) {

//     const schema = Yup.object().shape({
//         name: Yup.string().required(),
//         age: Yup.number(),
//         city: Yup.string().required(),
//         size: Yup.string().required(),
//         gender: Yup.string().required(),
//         breed: Yup.string(),
//         weight: Yup.number(),
//         vaccine: Yup.boolean(),
//         castration: Yup.boolean(),
//         microchip: Yup.boolean(),
//         url: Yup.string().required(),
//         description: Yup.string().required(),
//     });

//     if (!(await schema.isValid(req.body))) {
//         return res.status(400).json({ error: 'Falha ao validar.' });
//     }

//     const pet = await Pet.findByPk(req.params.id);

//     const { name, age, city, size, gender, breed, weight, vaccine, castration, microchip, url, description } = await pet.update(req.body);

//     return res.json({
//         name,
//         age,
//         city,
//         size,
//         gender,
//         breed,
//         weight,
//         vaccine,
//         castration,
//         microchip,
//         url,
//         description
//     });
// }

// async delete(req, res) {
//     try {
//         const pet = await Pet.findByPk(req.params.id);

//         await pet.destroy();

//         return res.status(200).json({ message: `Pet ${req.params.id} foi deletado` });
//     } catch (err) {
//         return res.status(400).json({ error: err.message });
//     }
// }
// }
// export default new PetController();