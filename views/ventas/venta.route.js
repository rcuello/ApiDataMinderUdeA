import Express from "express";
import { findAllVentas,createVenta,deleteVenta,findVentaById, updateVenta } from "../../model/venta.model.js";
const rutasVenta = Express();

const genercCallback = (res) => (err, result) => {
    if (err) {
      res.status(500).send('Error consultando los ventas');
    } else {
      res.json(result);
    }
  };

  rutasVenta.route('/ventas').get((req, res) => {
    /*const ventas =[
        {id:"FAC01",vendedor:"Ronald",comprador:"Cuello",totalVenta:"320800"},
        {id:"FAC02",vendedor:"Alejandro",comprador:"Nagno",totalVenta:"120800"},
        {id:"FAC03",vendedor:"Marco",comprado:"Polo",totalVenta:"25000"},
        {id:"FAC04",vendedor:"Cleopatra",comprador:"Egito",totalVenta:"520800"}
    ];

    res.send(ventas);*/
    findAllVentas(genercCallback(res));
  });
  
  rutasVenta.route('/ventas').post((req, res) => {
    const json = req.body;
    createVenta(json,genercCallback(res));
  });
  
  rutasVenta.route('/ventas/:id').get((req, res) => {
    findVentaById(req.params.id, genercCallback(res));
  });
  
  rutasVenta.route('/ventas/:id').patch((req, res) => {
    const json = req.body;  
    updateVenta(req.params.id,json, genercCallback(res));
  });
  
  rutasVenta.route('/ventas/:id').delete((req, res) => {
    deleteVenta(req.params.id, genercCallback(res));
  });

export default rutasVenta;