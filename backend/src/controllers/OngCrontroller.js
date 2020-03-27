const crypto = require("crypto");
const database = require("../database/connection");

module.exports = {
    async create (request, response) {
        const { name, email, whatsapp, city, uf } = request.body;
        const id = crypto.randomBytes(4).toString('HEX');

        await database('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return response.send({ id });
    },
    async index (request, response) {
        const ongs = await database('ongs').select('*');
        return response.send(ongs);
    }
}