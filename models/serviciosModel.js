var pool = require('./bd'); // llamando datos BD

async function getServicios() {

    var query = "select * from servicios order by id desc";
    var rows = await pool.query(query);
    return rows;
}

async function insertServicio(obj) {
    try {
        var query = "insert into servicios set ? ";
        var rows = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function deleteServicioById(id) {

        var query = "delete from servicios where id = ? ";
        var rows = await pool.query(query, [id]);
        return rows;
    }

    async function getServiciosById(id) {
    var query = "select * from servicios where id = ? ";
    var rows = await pool.query(query, [id]);
    return rows[0];
}

    async function modificarServicioById(obj, id) {
        try {
            var query = "update servicios set ? where id = ?";
            var rows = await pool.query(query, [obj, id]);
            return rows;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

module.exports = { getServicios, insertServicio, deleteServicioById, modificarServicioById, getServiciosById }